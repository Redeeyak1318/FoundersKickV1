console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

import "../styles/globals.css"

export const metadata = {
  title: "FoundersKick",
  description: "Connect Commit Collaborate."
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="gradient-bg">
        {children}
      </body>
    </html>
  )
}
