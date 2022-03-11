import Link from 'next/link';

export default function Home() {
  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item active">Home</li>
      </ol>
      <div className="jumbotron pt-4 pb-2">
        <h1 className="display-3 mb-4 mt-0">Welcome</h1>
        <p className="lead">
          This is an example application using nextjs as a host, and create react application
          as remotes. These are dynamically resolved in each next page route, and defined either 
          ssr true/false.
        </p>
        <p>
          Check out remotes here: <br /><br />
          <div>• <Link href="/dashboard"><a>Dashboard Remote App</a></Link></div>
          <div>• <Link href="/sample"><a>Sample Remote App</a></Link></div>
          <div>• <Link href="/profile"><a>Profile Remote App (Typescript)</a></Link></div>
        </p>
      </div>
    </>
  )
}
