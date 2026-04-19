// Login.jsx - Updated version
import React, { useState } from "react";
import { loginStyles } from "../assets/dummyStyles";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api"; // Changed from 'App' to 'API'
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

const Login = ({ onLoginSuccess = null }) => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Please enter a valid email";
    if (!password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError("");
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length) return;
    setLoading(true);

    try {
      const payload = { email: email.trim().toLowerCase(), password };
      
      // Using API utility instead of fetch
      const response = await API.post("/api/auth/login", payload);
      
      if (response.data?.token) {
        // Use authLogin from context
        authLogin(response.data.user, response.data.token);
      }

      const user = response.data.user || { email: payload.email };
      
      // Dispatch custom event
      window.dispatchEvent(
        new CustomEvent("authChanged", { detail: { user } })
      );

      if (typeof onLoginSuccess === "function") onLoginSuccess(user);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      setSubmitError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

//   // Rest of your component remains the same...
//   return (
//     // ... your JSX remains unchanged
//   );
// };

//export default Login;

// import React, { useState } from "react";
// import { loginStyles } from "../assets/dummyStyles";
// import { useAuth } from "../context/AuthContext";
// import App from "../utils/api";

// import { useNavigate, Link } from "react-router-dom";
// import { ArrowLeft, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:9999";

// const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// const Login = ({ onLoginSuccess = null }) => {
//   const navigate = useNavigate();
//   const { login: authLogin } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [submitError, setSubmitError] = useState("");

  

//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     setSubmitError("");
//     const validation = validate();
//     setErrors(validation);
//     if (Object.keys(validation).length) return;
//     setLoading(true);

//     try {
//       const payload = { email: email.trim().toLowerCase(), password };
//       const resp = await fetch(`${API_BASE}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       let data = null;
//       try {
//         data = await resp.json();
//       } catch (e) {}

//       if (!resp.ok) {
//         const msg = data?.message || "Login failed";
//         setSubmitError(msg);
//         return;
//       }

//       if (data?.token) {
//         // Use authLogin instead of manual localStorage
//         authLogin(data.user, data.token);
//       }

//       const user = data.user || { email: payload.email };
//       window.dispatchEvent(
//         new CustomEvent("authChanged", { detail: { user } }),
//       );

//       if (typeof onLoginSuccess === "function") onLoginSuccess(user);
//       navigate("/", { replace: true });
//     } catch (err) {
//       console.error("Login error:", err);
//       setSubmitError("Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

  // EMAIL VALIDATE FUNCTION
  const validateForm = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Please enter a valid email";

    if (!password) e.password = "Password is required";
    return e;
  };

  return (
    <div className={loginStyles.pageContainer}>
      <div className={loginStyles.bubble1}></div>
      <div className={loginStyles.bubble2}></div>

      <Link to="/" className={loginStyles.backButton}>
        <ArrowLeft className={loginStyles.backButtonIcon} />
        <span className={loginStyles.backButtonText}>Home</span>
      </Link>

      <div className={loginStyles.formContainer}>
        <form onSubmit={handleSubmit} className={loginStyles.form} noValidate>
          <div className={loginStyles.formWrapper}>
            <div className={loginStyles.animatedBorder}>
              <div className={loginStyles.formContent}>
                <h2 className={loginStyles.heading}>
                  <span className={loginStyles.headingIcon}>
                    <LogIn className={loginStyles.headingIconInner} />
                  </span>
                  <span className={loginStyles.headingText}>Login</span>
                </h2>

                <p className={loginStyles.subtitle}>
                  Sign in to continue to Stranger Quiz. Light, clean UI - smooth
                  mirco-animations and easy validation.
                </p>

                <label className={loginStyles.label}>
                  <span className={loginStyles.labelText}>Email</span>
                  <div className={loginStyles.inputContainer}>
                    <span className={loginStyles.inputIcon}>
                      <Mail className={loginStyles.inputIconInner} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email)
                          setErrors((s) => ({
                            ...s,
                            email: undefined,
                          }));
                      }}
                      className={`${loginStyles.input} ${
                        errors.email
                          ? loginStyles.inputError
                          : loginStyles.inputNormal
                      }`}
                      placeholder="your@example.com"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className={loginStyles.errorText}>{errors.email}</p>
                  )}
                </label>

                <label className={loginStyles.label}>
                  <span className={loginStyles.labelText}>Password</span>
                  <div className={loginStyles.inputContainer}>
                    <span className={loginStyles.inputIcon}>
                      <Lock className={loginStyles.inputIconInner} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password)
                          setErrors((s) => ({
                            ...s,
                            password: undefined,
                          }));
                      }}
                      className={`${loginStyles.input} ${loginStyles.passwordInput} ${
                        errors.password
                          ? loginStyles.inputError
                          : loginStyles.inputNormal
                      }`}
                      placeholder="enter your password"
                      required
                    />

                    {/* // Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className={loginStyles.passwordToggle}
                    >
                      {showPassword ? (
                        <EyeOff className={loginStyles.passwordToggleIcon} />
                      ) : (
                        <Eye className={loginStyles.passwordToggleIcon} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className={loginStyles.errorText}>{errors.password}</p>
                  )}
                </label>

                {submitError && (
                  <p className={loginStyles.submitError}>{submitError}</p>
                )}

                <div className={loginStyles.buttonsContainer}>
                  <button
                    type="submit"
                    className={loginStyles.submitButton}
                    disabled={loading}
                  >
                    {loading ? (
                      "Signing in..."
                    ) : (
                      <>
                        <LogIn className={loginStyles.submitButtonIcon} />
                        <span className={loginStyles.submitButtonText}>
                          Sign in
                        </span>
                      </>
                    )}
                  </button>
                  <div className={loginStyles.loginPromptContainer}>
                    <div className={loginStyles.loginPromptContent}>
                      <span className={loginStyles.loginPromptText}>
                        Don't have an account?
                      </span>
                      <Link
                        to="/signup"
                        className={loginStyles.loginPromptLink}
                      >
                        Create Account
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <style>{loginStyles.animations}</style>
    </div>
  );
};

export default Login;


// import React, { useState } from "react";
// import { loginStyles } from "../assets/dummyStyles";
// import { useAuth } from "../context/AuthContext";
// import API from "../utils/api";
// import { useNavigate, Link } from "react-router-dom";
// import { ArrowLeft, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

// const Login = ({ onLoginSuccess = null }) => {
//   const navigate = useNavigate();
//   const { login: authLogin } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [submitError, setSubmitError] = useState("");

//   const isValidEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   // ✅ Only ONE validation function (fixed)
//   const validate = () => {
//     const e = {};
//     if (!email) e.email = "Email is required";
//     else if (!isValidEmail(email))
//       e.email = "Please enter a valid email";

//     if (!password) e.password = "Password is required";

//     return e;
//   };

//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     setSubmitError("");

//     const validation = validate();
//     setErrors(validation);

//     if (Object.keys(validation).length) return;

//     setLoading(true);

//     try {
//       const payload = {
//         email: email.trim().toLowerCase(),
//         password,
//       };

//       const response = await API.post("/api/auth/login", payload);

//       if (response.data?.token) {
//         authLogin(response.data.user, response.data.token);
//       }

//       const user = response.data.user || {
//         email: payload.email,
//       };

//       window.dispatchEvent(
//         new CustomEvent("authChanged", { detail: { user } })
//       );

//       if (typeof onLoginSuccess === "function")
//         onLoginSuccess(user);

//       navigate("/", { replace: true });
//     } catch (err) {
//       console.error("Login error:", err);
//       const errorMessage =
//         err.response?.data?.message ||
//         "Login failed. Please try again.";
//       setSubmitError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={loginStyles.pageContainer}>
//       <div className={loginStyles.bubble1}></div>
//       <div className={loginStyles.bubble2}></div>

//       <Link to="/" className={loginStyles.backButton}>
//         <ArrowLeft className={loginStyles.backButtonIcon} />
//         <span className={loginStyles.backButtonText}>Home</span>
//       </Link>

//       <div className={loginStyles.formContainer}>
//         <form
//           onSubmit={handleSubmit}
//           className={loginStyles.form}
//           noValidate
//         >
//           <div className={loginStyles.formWrapper}>
//             <div className={loginStyles.animatedBorder}>
//               <div className={loginStyles.formContent}>
//                 <h2 className={loginStyles.heading}>
//                   <span className={loginStyles.headingIcon}>
//                     <LogIn
//                       className={loginStyles.headingIconInner}
//                     />
//                   </span>
//                   <span className={loginStyles.headingText}>
//                     Login
//                   </span>
//                 </h2>

//                 <p className={loginStyles.subtitle}>
//                   Sign in to continue to Stranger Quiz.
//                 </p>

//                 {/* Email */}
//                 <label className={loginStyles.label}>
//                   <span className={loginStyles.labelText}>
//                     Email
//                   </span>
//                   <div className={loginStyles.inputContainer}>
//                     <span className={loginStyles.inputIcon}>
//                       <Mail
//                         className={
//                           loginStyles.inputIconInner
//                         }
//                       />
//                     </span>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => {
//                         setEmail(e.target.value);
//                         if (errors.email)
//                           setErrors((s) => ({
//                             ...s,
//                             email: undefined,
//                           }));
//                       }}
//                       className={`${loginStyles.input} ${
//                         errors.email
//                           ? loginStyles.inputError
//                           : loginStyles.inputNormal
//                       }`}
//                       placeholder="your@example.com"
//                     />
//                   </div>
//                   {errors.email && (
//                     <p className={loginStyles.errorText}>
//                       {errors.email}
//                     </p>
//                   )}
//                 </label>

//                 {/* Password */}
//                 <label className={loginStyles.label}>
//                   <span className={loginStyles.labelText}>
//                     Password
//                   </span>
//                   <div className={loginStyles.inputContainer}>
//                     <span className={loginStyles.inputIcon}>
//                       <Lock
//                         className={
//                           loginStyles.inputIconInner
//                         }
//                       />
//                     </span>

//                     <input
//                       type={
//                         showPassword ? "text" : "password"
//                       }
//                       value={password}
//                       onChange={(e) => {
//                         setPassword(e.target.value);
//                         if (errors.password)
//                           setErrors((s) => ({
//                             ...s,
//                             password: undefined,
//                           }));
//                       }}
//                       className={`${loginStyles.input} ${
//                         loginStyles.passwordInput
//                       } ${
//                         errors.password
//                           ? loginStyles.inputError
//                           : loginStyles.inputNormal
//                       }`}
//                       placeholder="enter your password"
//                     />

//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowPassword((s) => !s)
//                       }
//                       className={
//                         loginStyles.passwordToggle
//                       }
//                     >
//                       {showPassword ? (
//                         <EyeOff
//                           className={
//                             loginStyles.passwordToggleIcon
//                           }
//                         />
//                       ) : (
//                         <Eye
//                           className={
//                             loginStyles.passwordToggleIcon
//                           }
//                         />
//                       )}
//                     </button>
//                   </div>

//                   {errors.password && (
//                     <p className={loginStyles.errorText}>
//                       {errors.password}
//                     </p>
//                   )}
//                 </label>

//                 {submitError && (
//                   <p className={loginStyles.submitError}>
//                     {submitError}
//                   </p>
//                 )}

//                 <div className={loginStyles.buttonsContainer}>
//                   <button
//                     type="submit"
//                     className={
//                       loginStyles.submitButton
//                     }
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       "Signing in..."
//                     ) : (
//                       <>
//                         <LogIn
//                           className={
//                             loginStyles.submitButtonIcon
//                           }
//                         />
//                         <span
//                           className={
//                             loginStyles.submitButtonText
//                           }
//                         >
//                           Sign in
//                         </span>
//                       </>
//                     )}
//                   </button>

//                   <div
//                     className={
//                       loginStyles.loginPromptContainer
//                     }
//                   >
//                     <span
//                       className={
//                         loginStyles.loginPromptText
//                       }
//                     >
//                       Don't have an account?
//                     </span>
//                     <Link
//                       to="/signup"
//                       className={
//                         loginStyles.loginPromptLink
//                       }
//                     >
//                       Create Account
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>

//       <style>{loginStyles.animations}</style>
//     </div>
//   );
// };

// export default Login;