import { observer } from "mobx-react-lite";
import { RootStoreContext } from "./store/RootStore";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./App.module.scss";
import CatCard from "./Components/CatCard/CatCard";

const App = observer(() => {
  const {
    GithubStore: {
      getGithubCats,
      cats,
      loading,
      isFavoritePage,
      setIsFavoritePage,
    },
  } = useContext(RootStoreContext);

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getGithubCats(page);
  }, [getGithubCats, page]);

  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && !isFavoritePage) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1, rootMargin: "50px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, isFavoritePage]);

  return (
    <div className={styles.Container}>
      <div>
        <ul className={styles.tabs}>
          <li
            className={!isFavoritePage ? styles.activeTab : styles.tab}
            onClick={() => setIsFavoritePage(false)}
          >
            Все котики
          </li>
          <li
            className={isFavoritePage ? styles.activeTab : styles.tab}
            onClick={() => setIsFavoritePage(true)}
          >
            Любимые котики
          </li>
        </ul>
      </div>
      <div className={styles.Content}>
        {cats
          .filter((i) => (isFavoritePage ? i.favorite === true : true))
          .map((cat, i) => (
            <CatCard cat={cat} cats={cats} key={cat.id + i} />
          ))}
      </div>
      {!loading && cats.length === 0 && (
        <div className={styles.loading}>Нет котов для отображения(</div>
      )}
      {loading && (
        <div className={styles.loading}>...загружаем ещё котиков...</div>
      )}

      <div
        ref={loaderRef}
        style={{ height: "20px", background: "transparent" }}
      ></div>
    </div>
  );
});

export default App;
