export default function Footer() {
  return (
    <footer className="mt-auto flex h-16 items-center justify-between border-t border-white/10 px-3 text-xs text-white/25 sm:px-9">
      <small className="text-xs">
        &copy; {new Date().getFullYear()} Md. Minar Munshi. All rights reserved.
      </small>

      {/* TODO: Add terms and policy page */}
    </footer>
  );
}
