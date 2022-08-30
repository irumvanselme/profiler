import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Profile from "./[username]";

export default function MyProfile() {
    const [user, setUser] = useState(null);

    const router = useRouter();

    useEffect(() => {
        (async function () {
            let user_id = localStorage.getItem("session_id");
            if (!user_id) return await router.push("/auth/login");

            let user = await axios.get("/api/v1/users/" + user_id);
            setUser(user.data);
        })();
    }, [router]);

    if (user == null) return <div>Loading...</div>;
    return <Profile user={user} />;
}
