import {Helmet as ReactHelmet} from "react-helmet";

interface HelmetProps {
    title: string,
    description: string,
    keywords: string
    noFollow?: boolean
}

const Helmet = ({title, description, keywords, noFollow = false}: HelmetProps) => {
    return (
        <ReactHelmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
            {noFollow && <meta name="robots" content="noindex, nofollow"/>}
        </ReactHelmet>
    )
}

export default Helmet
