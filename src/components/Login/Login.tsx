import React, { useEffect, useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./loginSchema";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

export const Login = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.removeAttribute("data-theme");

    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Dados válidos!", data);
  };

  return (
    <>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Alternar para tema ${theme === "dark" ? "claro" : "escuro"}`}
        title={`Mudar para modo ${theme === "dark" ? "claro" : "escuro"}`}
      >
        <span className="theme-icon">
          {theme === "dark" ? (
            <FaSun color="#f8f9fb" size={24} />
          ) : (
            <FaMoon color="#111828" size={24} />
          )}
        </span>
      </button>
      <div className="login-container">
        <div className="login-card">
          <div className="logo">
            <img src="src/assets/img/logo_monocrome.png" alt="Isatec Sistema" />
          </div>

          <div className="login-header">
            <h1 id="login-title">Bem-vindo</h1>
            <p id="login-subtitle">Faça login na sua conta</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate id="form">
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                {...register("email")}
                placeholder="seu@email.com"
                className={`input ${errors.email ? "error" : ""}`}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="********"
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            <div className="forgot-password">
              <a href="#">Esqueceu a senha?</a>
            </div>

            <button type="submit" className="login-btn" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <footer id="footer">&copy;Isatec Sistemas & Consultoria</footer>
        </div>
      </div>
    </>
  );
};
