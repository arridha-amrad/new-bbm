import { getAuthUser } from "@/helpers/getAuthUser";
import { setAuth } from "@/lib/redux/authSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const verify = async () => {
      try {
        const user = await getAuthUser();
        dispatch(setAuth(user));
      } catch {
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  return loading;
};
