import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {

    return (
        <div className="
            min-h-screen
            bg-white
            text-zinc-950
            transition-colors
            duration-300
            dark:bg-zinc-950
            dark:text-white
        ">

            <Navbar />

            <main>
                <AppRoutes />
            </main>

        </div>
    );
};

export default App;