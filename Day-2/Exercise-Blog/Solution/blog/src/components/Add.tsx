
import React, { Dispatch, SetStateAction } from 'react';
import { IArticle } from './Article';

interface AddProps {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setTempArticle: Dispatch<SetStateAction<IArticle>>;
}

function Add(props: AddProps) {
    const { setIsModalOpen, setTempArticle } = props;
    const defaultTempArticle = {
        id: 0,
        title: '',
        tag: '',
        author: '',
        date: '',
        imgUrl: '',
        saying: '',
        content: '',
      }
    return (
        <div className="add__container">
            <button
                type="button"
                onClick={() => {
                    setIsModalOpen(true);
                    setTempArticle(defaultTempArticle);
                }}
                className="button"> + Add Article</button>
        </div>
    );
}

export default Add;
