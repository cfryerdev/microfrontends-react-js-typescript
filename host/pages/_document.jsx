import Document, { Html, Head, Main, NextScript } from "next/document";

// import remotes from "../next.remotes.json";

// const RemoteTags = () => {
//     return remotes.map((remote, i) => {
//         console.log(`Loading Remote: ${remote.name}`);
//         return <script key={i} src={remote.url}></script>
//     });
// }

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    // InjectAndLoadScript = (document, name, url) => {
    //     return new Promise((resolve, reject) => {
    //         console.log(`Loading Remote: ${name}`);
    //         const script = document.createElement("script");
    //         script.src = url;
    //         script.addEventListener("load", resolve);
    //         script.addEventListener("error", (e) => reject(e.error));
    //         document.head.appendChild(script);
    //     });
    // };
    
    // LoadAllScripts = async () => {
    //     const promises = remotes.map((remote) => { 
    //         return InjectAndLoadScript(document, remote.name, remote.url);
    //     });
    //     await Promise.all(promises);
    // }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <script src="http://localhost:3001/remote.js"></script>
                    <script src="http://localhost:3002/remote.js"></script>
                    <script src="http://localhost:3003/remote.js"></script>
                    <Main />
                    {/* <RemoteTags /> */}
                    <NextScript />
                </body>
            </Html>
        );
    }


}

export default MyDocument;