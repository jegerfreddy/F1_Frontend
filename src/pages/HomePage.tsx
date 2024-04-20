

const HomePage = () => {
    return (
        <>
            <div className="container-fluid">
                <main className="homePageMain">
                    <div className="d-flex flex-column justify-content-center ps-5 pe-5 pb-5 pt-3">

                        <h1 className="display-1 text-light text-center mb-3"><u>FORMULA 1</u></h1>

                        <div className="mainPageArticle bg-dark border border-2 border-warning rounded shadow-lg p-5 w-50 mt-3">
                            <h1><u>A Place for the Best Drivers in the World</u></h1>
                            <p>Add your own driver to the roster, and compete with the best!</p>
                            <h4 className="mt-5">Start your journey from the <b>Driver</b> section now.</h4>
                        </div>

                        <div className="mainPageArticle bg-dark border border-2 border-warning align-self-end d-flex flex-column align-items-end rounded shadow-lg p-5 w-50 mt-5 mb-5">
                            <h1><u>Test your reflexes</u></h1>
                            <p>With the integrated reflex-tester you can measure yourself against the best!</p>
                            <h4 className="mt-5">Begin the test by navigating to the <b>Play F1 section</b>.</h4>
                        </div>

                    </div>
                </main>

                <footer className="homePageFooter">
                    <div className="d-flex flex-column justify-content-center p-5">

                        <div className="mainPageArticle bg-dark align-self-center border border-2 border-warning d-flex flex-column align-items-center justify-self-center rounded p-5 w-50 mt-5">
                            <h1 className="">RISE TO THE TOP</h1>
                            <p>Get the best reflex-score by beating the best drivers there is.</p>
                            <h4 className="mt-5">Begin the test by navigating to the <b>Play F1 section</b>.</h4>
                        </div>

                    </div>
                </footer>
            </div>
        </>
    )
}

export default HomePage;