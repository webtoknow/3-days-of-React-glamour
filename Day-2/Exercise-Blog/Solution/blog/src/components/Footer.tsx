import React, { Dispatch, SetStateAction } from 'react';

interface FooterProps {
    numberOfArticlesToDisplay: number;
    startDisplayIndex: number;
    articlesLength: number;
    setStartDisplayIndex: Dispatch<SetStateAction<number>>;
}

function Footer(props: FooterProps) {
    const { numberOfArticlesToDisplay, startDisplayIndex, articlesLength,setStartDisplayIndex } = props
    return (
        <footer className="footer">
            {startDisplayIndex > 0 &&
                <button
                    onClick={(e) => setStartDisplayIndex(startDisplayIndex - numberOfArticlesToDisplay)}
                    className="footer__link">previous</button>}
            {startDisplayIndex + numberOfArticlesToDisplay < articlesLength && 
                <button
                    onClick={(e) => setStartDisplayIndex(startDisplayIndex + numberOfArticlesToDisplay)}
                    className="footer__link footer__link--next">next</button>}
        </footer>
    );
}

export default Footer;