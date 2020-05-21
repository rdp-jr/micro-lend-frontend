import Head from 'next/head'
import Link from 'next/link'

const Layout = (props) => {
  return (
    <>
    <Head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous"></link>
    </Head>
    { props.children }
    </>
  )
}

export default Layout
