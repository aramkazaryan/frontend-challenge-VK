import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../store/RootStore";
import { useContext } from "react";
import styles from "./CatCard.module.scss";
import { ICat } from "../../store/CatStore";
import FavoriteBorder from "../../assets/favorite_border.svg";
import FavoriteHover from "../../assets/favorite_hover.svg";
import FavoriteClick from "../../assets/favorite_click.svg";
interface Props {
  cat: ICat;
  cats: ICat[];
}
const CatCard: React.FC<Props> = observer(({ cat }) => {
  const {
    GithubStore: { toggleFavorite },
  } = useContext(RootStoreContext);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.CatCard}>
      <div
        style={{ backgroundImage: `url(${cat.url})` }}
        className={styles.CatImg}
      >
        <div
          className={styles.FavoriteContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={FavoriteClick}
            alt="FavoriteClick"
            className={`${styles.icon} ${
              cat.favorite ? "styles.hidden" : styles.hidden
            }`}
          />
          <img
            src={FavoriteBorder}
            alt="FavoriteBorder"
            className={`${styles.icon} ${cat.favorite ? styles.hidden : ""}`}
          />
          <img
            src={FavoriteHover}
            alt="FavoriteHover"
            className={`${styles.icon} ${
              isHovered ? styles.visible : styles.hidden
            }`}
            onClick={() => toggleFavorite(cat.id)}
          />
        </div>
      </div>
    </div>
  );
});

export default CatCard;
