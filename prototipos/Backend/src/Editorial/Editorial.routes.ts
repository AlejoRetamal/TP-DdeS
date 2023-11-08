import { Router } from 'express';
import { findAll, findOne, sanitizeInput, add, remove, update } from './Editorial.controller.js';

export const editorialRouter = Router();

editorialRouter.get('/', findAll)
editorialRouter.get('/:id', findOne)
editorialRouter.post('/', sanitizeInput, add)
editorialRouter.put('/:id', sanitizeInput, update)
editorialRouter.patch('/:id', sanitizeInput, update)
editorialRouter.delete('/:id', remove)