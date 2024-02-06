import connectDB from '@/db';
import { ApiResponse } from '@/lib/ApiResponse';
import User from '@/models/User.model';
import bcrypt from 'bcrypt';

export async function POST(req, res) {
  try {
    await connectDB();

    const { fullname, email, password } = await req.json();

    // validation - not empty
    if ([fullname, email, password].some((field) => field?.trim() === '')) {
      return Response.json(
        new ApiResponse(400, null, 'All fields are required')
      );
    }

    // check if user already exists: email
    const userExist = await User.findOne({ email });
    if (userExist) {
      return Response.json(
        new ApiResponse(409, null, 'User with email already exists')
      );
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user object - create entry in DB
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select('-password');

    // check for user creation
    if (!createdUser) {
      return Response.json(
        new ApiResponse(
          500,
          null,
          'Something went wrong while registering the user'
        )
      );
    }

    // return response
    return Response.json(
      new ApiResponse(201, createdUser, 'User Created Successfully!')
    );
  } catch (error) {
    return Response.json(new ApiResponse(500, null, error.message));
  }
}
