import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Message() {
    //Hook para navegacao
    const navigate = useNavigate();

    //Hook para acessar parametros da rota
    const { id } = useParams();

    //Convertendo o ID para um numero inteiro
    const idNumber = parseInt(id);

    //Funcao para obter mensagem com base no ID
    const getMessage = () => {
        if (idNumber === 1)
            return "Você se registrou com sucesso! Agora você pode fazer login.";
        else if (idNumber === 2)
            return "Você fez login com sucesso!";
        else if (idNumber === 3) {
            logout();
            return "Você fez logout com sucesso!";
        }
    }

    //Funcao para realizar logout removendo informacoes da sessao
    const logout = () => {
        sessionStorage.removeItem('sessionID');
        sessionStorage.removeItem('user');
        return;
    }

    //Efeito para redirecionar para a pagina inicial apos um intervalo de 2 segundos
    useEffect(() => {
        let timeleft = 2;
        const downloadTimer = setInterval(() => {
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
                navigate("/");
            }
            timeleft -= 1;
        }, 1000);
    }, []);

    return (
        <div>
            <h1>{getMessage()}</h1>
        </div>
    );
}

export default Message;