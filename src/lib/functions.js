const base64 = (input) => {
    return Buffer.from(input).toString("base64");
};

export const fetchLogin = async function (email, password, setLoading) {
    try {
        setLoading(true)
        const res = await fetch(`${process.env.REACT_APP_BE_URL}/users/login`, {
            headers: {
                Authorization: `Basic ${base64([email, password].join(":"))},`,


            }, credentials: "include"
        })



        if (res.status === 400) return 400
        if (res.status === 404) return 404
        return (res.ok)
    } catch (error) {
        console.log(error)

    } finally {
        setLoading(false)
    }
}
