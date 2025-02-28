import express from "express";
export const catchAsync =
  (func: express.RequestHandler): express.RequestHandler =>
  (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
