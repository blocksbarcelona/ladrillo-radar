export function UberleapCredit() {
  const currentYear = new Date().getFullYear();

  return (
    <p className="footer-credit">
      © {currentYear} · Desarrollo por{" "}
      <a href="https://uberleap.com/">Uberleap</a>
    </p>
  );
}
