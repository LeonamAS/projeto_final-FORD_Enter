const express = require("express");
const path = require("path");
const cors = require("cors")

const app = express();

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.post("/login", async (req, res) => {
    try {
        
        const { nome, senha } = req.body

        if (!nome || !senha) {
            return res.status(400).json({
                message: "O campo de usuário ou senha não foi preenchido!"
            });
        }

        if (nome !== "admin" || senha !== "123456") {
            return res.status(401).json({
                message: "O nome de usuário ou senha está incorreto ou não foi cadastrado!"
            });
        }

        return res.status(200).json({
            id: 1,
            nome: "admin",
            email: "admin@email.com"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!",
            error: String(error)
        });
    }
});

app.get("/cards", (req, res) => {
    try {
        const cards = [
            {
                imagem: '/img/sunset.jpg',
                nome: 'Sunset',
                link: 'https://bsky.app/profile/kurogane.bsky.social/post/3lhhh52tfvs27',
                tipo: 'desenho'
            },
            {
                imagem: '/img/beach.jpg',
                nome: 'Beach',
                link: 'https://bsky.app/profile/kurogane.bsky.social/post/3lhhh52tfvs27',
                tipo: 'desenho'
            },
            {
                imagem: '/img/acorn.jpg',
                nome: 'Acorn',
                link: 'https://bsky.app/profile/kurogane.bsky.social/post/3lhhh52tfvs27',
                tipo: 'desenho'
            },
            {
                imagem: '/img/city.jpg',
                nome: 'Honda City Turbo II',
                link: 'https://bsky.app/profile/kurogane.bsky.social/post/3lhhh52tfvs27',
                tipo: 'desenho'
            }
        ];

        return res.status(200).json({ vehicles });

    } catch (error) {
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.listen(3001, () => {
    console.log("API running on http://localhost:3001/");
});