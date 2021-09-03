
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IArticle } from '../components/Article';

function Details() {
  let { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState({} as IArticle);
  const [firstContent, setFirstContent] = useState('' as string);
  const [secondContent, setSecondContent] = useState('' as string);
  const [prevArticleId, setPrevArticleId] = useState<number | undefined>(0);
  const [nextArticleId, setNextArticleId] = useState<number | undefined>(0);

  const getDataFromServer = (id: string) => {

    const getArticle = fetch(`http://localhost:4000/articles/${id}`);
    const getArticles = fetch('http://localhost:4000/articles/');

    Promise.all([getArticle, getArticles])
      .then(results => Promise.all(results.map(r => r.json())))
      .then(response => {
        const article: IArticle = response[0];
        const articles: IArticle[] = response[1];
        setArticle(article);
        setFirstContent(article.content.split(".").filter(((word, i, words) => i <= words.length / 2)).join(".") + '.');
        setSecondContent(article.content.split(".").filter(((word, i, words) => i > words.length / 2)).join("."));

        const idNumber = parseInt(id)
        const articleIndex = articles.findIndex((a) => a.id === idNumber)
        if (articleIndex === 0) {
          setPrevArticleId(0);
          setNextArticleId(articles[articleIndex + 1].id);
        } else {
          setPrevArticleId(articles[articleIndex - 1].id);
          setNextArticleId(articles[articleIndex + 1] && articles[articleIndex + 1].id);
        }
      })

  }

  useEffect(() => getDataFromServer(id), [id]);

  return (
    <div>
      <article>
        <h2 className="title  title--details">{article.title}</h2>
        <ul className="info__container info__container--details">
          <li className="info__item">{article.tag}</li>
          <li className="info__item">Added by&nbsp;
            <span className="info__mark">{article.author}</span>
          </li>
          <li className="info__item">{article.date}</li>
        </ul>

        <img src={`../${article.imgUrl}`} alt="Bike" />
        <div className="content__container">
          <p>{firstContent}</p>
          <p className="saying">Life is like riding a bicycle, to keep your balance you must keep moving</p>
          <p>{secondContent}</p>
        </div>
      </article>
      <footer className="footer">
        {prevArticleId !== 0 && <Link to={`/details/${prevArticleId}`}>
          <button className="footer__link">previous article</button>
        </Link>}
        {nextArticleId && <Link className="footer__link--next" to={`/details/${nextArticleId}`}>
          <button className="footer__link">next article</button>
        </Link>}
      </footer>
    </div>
  );
}

export default Details;
