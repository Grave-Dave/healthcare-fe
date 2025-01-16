import {Helmet as ReactHelmet} from "react-helmet";

interface HelmetProps {
    title: string,
    description: string,
    keywords: string
}

const Helmet = ({title, description, keywords}: HelmetProps) => {
    return (
        <ReactHelmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
        </ReactHelmet>
    )
}

export default Helmet
