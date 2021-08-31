
import React, { Dispatch, SetStateAction } from 'react';
import { IArticle } from './Article';

interface ModalProps {
    tempArticle: IArticle;
    setTempArticle: Dispatch<SetStateAction<IArticle>>;
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    getArticlesFromServer: Function;
}

function Modal(props: ModalProps) {
    const { setTempArticle, tempArticle, isModalOpen, setIsModalOpen, getArticlesFromServer } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTempArticle((prevState: IArticle) => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveOrUpdateArticle = (tempArticle: IArticle) => {
        const { id } = tempArticle;
        const article = {...tempArticle}
        const url = id === 0 ? 'http://localhost:4000/articles' : `http://localhost:4000/articles/${id}`;
        const method = id === 0 ? 'POST' : 'PUT';
        if (id === 0) {
            delete article.id
        }

        fetch(url, {
            method: method,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(article)
          }).then(function () {
            setIsModalOpen(false);
            getArticlesFromServer();
          });
    }

    let modalclassName = 'modal__overlay';
    if (isModalOpen) {
        modalclassName += ' show-modal';
    }
    return (
        <div className={modalclassName}>
            <div className="modal">
                <div className="modal__content">
                    <h2 className="title">Add/Edit article</h2>
                    <div className="inputs__container">
                        <input
                            value={tempArticle.title}
                            type="text"
                            onChange={handleChange}
                            name="title"
                            className="input"
                            placeholder="Please enter title" />
                        <input
                            value={tempArticle.tag}
                            type="text"
                            onChange={handleChange}
                            name="tag"
                            className="input"
                            placeholder="Please enter tag" />
                        <input
                            value={tempArticle.author}
                            type="text"
                            onChange={handleChange}
                            name="author"
                            className="input"
                            placeholder="Please enter author" />
                        <input
                            value={tempArticle.date}
                            type="text"
                            onChange={handleChange}
                            name="date"
                            className="input"
                            placeholder="Please enter date" />
                        <input
                            value={tempArticle.imgUrl}
                            type="text"
                            onChange={handleChange}
                            name="imgUrl"
                            className="input"
                            placeholder="Please enter image url" />
                        <input
                            value={tempArticle.saying}
                            type="text"
                            onChange={handleChange}
                            name="saying"
                            className="input"
                            placeholder="Please enter saying" />
                    </div>
                    <textarea
                        value={tempArticle.content}
                        onChange={handleChange}
                        name="content"
                        className="textarea"
                        cols={28}
                        rows={7}
                        placeholder="Please enter content"></textarea>
                    <div className="modal__buttons">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="button">Cancel</button>
                        <button type="button" onClick={() => saveOrUpdateArticle(tempArticle)} className="button button--pink">Save</button>
                    </div>
                </div>
            </div>
        </div>);
}

export default Modal;


