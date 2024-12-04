import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const defaultAdmin = {
    email: "admin@example.com",
    password: "admin#123",
  };

  const handleLogin = async () => {
    try {
      if (email === defaultAdmin.email && password === defaultAdmin.password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("adminId", "defaultAdmin");
        navigate("/dashboard");
        return;
      } else {
        setError("Email atau password salah.");
      }

      const response = await fetch(
        "https://674f3ee7bb559617b26e9702.mockapi.io/admin"
      );
      const admins = await response.json();

      const validAdmin = admins.find(
        (admin) => admin.email === email && admin.password === password
      );

      if (validAdmin) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("adminId", validAdmin.id);
        navigate("/dashboard");
      } else {
        setError("Email atau password salah.");
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setError("Terjadi kesalahan saat memproses login. Silakan coba lagi.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 text-start">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="mail@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
