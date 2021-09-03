import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface ArticleProps {
    article: IArticle;
    setTempArticle: Dispatch<SetStateAction<IArticle>>;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    getArticlesFromServer: Function;
}

export interface IArticle {
    id?: number;
    title: string;
    tag: string;
    author: string;
    date: string;
    imgUrl: string;
    saying: string;
    content: string;
}

function Article(props: ArticleProps) {
    const { article, setTempArticle, setIsModalOpen, getArticlesFromServer } = props
    const content = article.content.substring(0, 1000);

    const deleteArticle = (id: number = 0) => {
        fetch(`http://localhost:4000/articles/${id}`, {
         method: 'DELETE',
         }).then(function () {
            getArticlesFromServer();
       });
     }
    
    return (
        <article>
            <h2 className="title">{article.title}</h2>
            <ul className="info__container">
                <li className="info__item">{article.tag}</li>
                <li className="info__item">Added by&nbsp;
                    <span className="info__mark">{article.author}</span>
                </li>
                <li className="info__item">{article.date}</li>
            </ul>
            <div className="actions__container">
                <button
                    type="button"
                    onClick={() => {
                        setIsModalOpen(true);
                        setTempArticle((prevState: IArticle) => ({...prevState, ...article} as IArticle));
                    }}
                    className="actions__btn">Edit</button>
                <button type="button" onClick={() => deleteArticle(article.id)} className="actions__btn">Delete</button>
            </div>

            <img src={article.imgUrl} alt="Bike" />
            <div className="content__container">
                <p>{content}</p>
            </div>
            <div className="readmore__container">
                <Link to={`/details/${article.id}`}>
                    <button type="button" className="button">Read More</button>
                </Link>
            </div>
        </article>
    );
}

export default Article;