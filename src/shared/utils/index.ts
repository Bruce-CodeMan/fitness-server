/*
 * @Date: 2023-04-06 13:49:29
 * @Author: Bruce
 * @Description: generate four random code only numbers
 */
export const getRandomCode = () => {
    const code = [];
    for(let i = 0; i< 4; i++){
        code.push(Math.floor(Math.random() * 9));
    }
    return code.join();
}