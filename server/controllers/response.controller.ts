import { Response } from "express";

// ==================================================
// Get response
// ==================================================
export const getResponse = async (
    res: Response,
    status: number,
    ok: boolean,
    error: string,
    message: string,
    data: any
) => {
    return res.json({
        ok: ok,
        status: status,
        message: message,
        error: error,
        data: data
    });
};
