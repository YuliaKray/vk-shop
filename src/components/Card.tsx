import { useEffect, useState } from "react";
import { cards } from '../assets/data';
import './Card.css'
import icon from '../image/free-icon-font-trash-3917378.svg';

type cards = {
  id: number,
  price: number,
  total: number,
  thumbnail: string,
  title: string,
  count: number,
}[]

export function Card(): JSX.Element {
  const [card, setCard] = useState<cards>(cards);
  const [total, setTotal] = useState({
    price: card.reduce((prev, curr) => prev + curr.total, 0)
  })


  useEffect(() => {
    setTotal({ price: card.reduce((prev, curr) => prev + curr.total, 0) })
  }, [card])


  function deleteCard(id: number) {
    setCard((card) => card.filter((product) => id !== product.id));
  }

  function increase(id: number) {
    setCard((card) => card.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          count: item.count + 1,
          total: (item.count + 1) * item.price
        }
      } else {
        return item
      }
    }))
  }

  function decrease(id: number) {
    setCard((card) => card.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          count: item.count - 1,
          total: (item.count - 1) * item.price
        }
      } else {
        return item
      }
    }))
  }


  function getCard():JSX.Element[] {
    const cardRender = card.map((card) => {

      return (
        <li key={card.id}>
          <article className="card">

            <img src={card.thumbnail} alt={card.title} className="card__img" />
            <div>
              <h2>{card.title}</h2>
              <p>Описание</p>
              <p>Количество {card.count}</p>
              <p>Стоимость: {card.price} руб.</p>
              <button
                onClick={() => { decrease(card.id) }}
                disabled={(card.count === 1) ? true : false}>
                -
              </button>
              <button onClick={() => (increase(card.id))}
                disabled={(card.count === 10) ? true : false}>
                +
              </button>
              <button className="card__delete-btn" type="button" onClick={() => { deleteCard(card.id) }}>
                <img className="card__delete" src={icon} alt='Удалить'/>
              </button>
            </div>
          </article>
        </li>
      )
    })
    return cardRender;
  }


  return (
    <>
      <ul className="cards">
        {getCard()}
      </ul>
      <article>
        <h2>Итого: {total.price}</h2>
      </article>
    </>
  )
}