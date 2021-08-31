import React, { useState, useEffect } from 'react';
import Article, { ArticleModel as IArticle } from '../components/Article';
import Footer from '../components/Footer';

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setArticles] = useState([] as IArticle[]);
  const [startDisplayIndex, setStartDisplayIndex] = useState(0);
  const numberOfArticlesToDisplay = 3;

  useEffect(() => {
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
  }, [])

  if (error) {
    return <div>Error!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <main>
        {articles
          .filter((article, index) => (index >= startDisplayIndex) && (index < startDisplayIndex + numberOfArticlesToDisplay))
          .map(article => (
            <Article key={article.id} article={article} />
          ))}
        <Footer
          numberOfArticlesToDisplay={numberOfArticlesToDisplay}
          startDisplayIndex={startDisplayIndex}
          articlesLength={articles.length}
          setStartDisplayIndex={setStartDisplayIndex} />
      </main>
    );
  }
}

export default Home;
