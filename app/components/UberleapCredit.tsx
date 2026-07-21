export function UberleapCredit() {
  const currentYear = new Date().getFullYear();
  const credit = `© ${currentYear} · Desarrollo por `;

  return (
    <p className="footer-credit">
      {credit}
      <a href="https://uberleap.com/">Uberleap</a>
    </p>
  );
}
