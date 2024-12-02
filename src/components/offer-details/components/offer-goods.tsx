type OfferGoodsProps = {
  goods: string[];
};

export const OfferGoods = ({ goods }: OfferGoodsProps) => (
  <div className="offer__inside">
    <h2 className="offer__inside-title">What&apos;s inside</h2>
    <ul className="offer__inside-list">
      {goods.map((good) => (
        <li key={good} className="offer__inside-item">
          {good}
        </li>
      ))}
    </ul>
  </div>
);
