import { IUsers } from "src/interfaces";

export const emailUserExist = (user: IUsers[], emailRequest: string) => {
    const emailExist = user.some(({ email: mail }: IUsers) => {
        return mail === emailRequest
    })

    return emailExist
}