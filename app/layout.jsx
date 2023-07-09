import Header from '@components/Header'
import Provider from '@components/Provider'
import '@styles/globals.css'
export const metadata = {
    title : 'promtopia',
    description : 'promtopia is an amaziag website'
}
const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
          <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
        <main className="app">
          <Header />
            {children}
        </main>
        </Provider>
        </body>
    </html>
  )
}

export default RootLayout