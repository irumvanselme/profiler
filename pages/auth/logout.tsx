import { useRouter } from "next/router";
import { useEffect } from "react"

export default function LogOut() {

    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem("session_id");

        router.push("/auth/login");
    }, [])

    return (
        <div>
            Hello. we are logging out
        </div>
    )
}