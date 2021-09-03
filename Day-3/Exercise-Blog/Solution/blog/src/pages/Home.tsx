import React, { useState, useEffect } from 'react';
import Add from '../components/Add';
import Article, { IArticle } from '../components/Article';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState([] as IArticle[]);
  const [startDisplayIndex, setStartDisplayIndex] = useState(0);
  const numberOfArticlesToDisplay = 3;
  const [tempArticle, setTempArticle] = useState(
    {
      id: 0,
      title: '',
      tag: '',
      author: '',
      date: '',
      imgUrl: '',
      saying: '',
      content: '',
    } as IArticle);

  const getArticlesFromServer = () => {
    fetch("http://localhost:4000/articles")
      .then(res => res.json())
      .then(
        (result: IArticle[]) => {
          setIsLoaded(true);
          setArticles(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => getArticlesFromServer(), []);

  if (error) {
    return <div>Error!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <main>
        <Add setIsModalOpen={setIsModalOpen} setTempArticle={setTempArticle} />
        {articles
          .filter((article, index) => (index >= startDisplayIndex) && (index < startDisplayIndex + numberOfArticlesToDisplay))
          .map((article, index, articles) => {
            return (
              <Article
                key={article.id}
                article={article}
                setIsModalOpen={setIsModalOpen}
                setTempArticle={setTempArticle}
                getArticlesFromServer={getArticlesFromServer}
              />
            )
          }
          )}
        <Footer
          numberOfArticlesToDisplay={numberOfArticlesToDisplay}
          startDisplayIndex={startDisplayIndex}
          articlesLength={articles.length}
          setStartDisplayIndex={setStartDisplayIndex} />
        <Modal
          isModalOpen={isModalOpen}
          tempArticle={tempArticle}
          setTempArticle={setTempArticle}
          setIsModalOpen={setIsModalOpen}
          getArticlesFromServer={getArticlesFromServer}
        />
      </main>
    );
  }
}

export default Home;
