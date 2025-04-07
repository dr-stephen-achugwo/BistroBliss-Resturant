import './globals.css'

export const metadata = {
  title:{
    template: "%s | Bistro Bliss",
    default: "Bistro Bliss",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
