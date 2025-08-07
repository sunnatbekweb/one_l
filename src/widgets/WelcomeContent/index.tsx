import styles from "./loader.module.css";

export const WelcomePageContent = () => {
  return (
    <main className="main-container h-screen grid place-content-center">
      <div className="flex items-center gap-x-5">
        <div className="w-18 h-18">
          <img
            src="/favicon.ico"
            className="w-full h-full object-contain"
            alt="Logo icon"
          />
        </div>
        <h1 className="font-bold text-6xl italic">1LOG</h1>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%]">
          <span className={styles.loader}></span>
        </div>
      </div>
    </main>
  );
};
