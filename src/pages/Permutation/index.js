import React, { useEffect, useRef, useState } from 'react';
import api from '../../services/api';

import './style.css';

export default function Permutation() {
  const [valor, setValor] = useState('');
  const [isNumber, setIsNumber] = useState(true);
  const [permutations, setPermutations] = useState([]);
  const [totalPermutations, setTotalPermutations] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [scrollRadio, setScrollRadio] = useState(null);

  const scrollObserve = useRef();

  const intersectionObserver = new IntersectionObserver((entries) => {
    setScrollRadio(entries[0].intersectionRatio);
  });

  useEffect(() => {
    intersectionObserver.observe(scrollObserve.current);

    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (scrollRadio > 0 && permutations.length > 0) {
      const next = pagina + 1;

      setPagina(next);
      setPermutations((anterior) => [
        ...anterior,
        ...nextPage(totalPermutations, next),
      ]);
    }

    return () => {};
  }, [scrollRadio]);

  // cria o nosso array dependendo da entrada do usuário
  async function generateArray(e) {
    e.preventDefault();

    setPermutations([]);
    setPagina(1);

    if (!valor) return;

    let array = [];

    if (isNumber) {
      let val = parseInt(valor);

      if (!val || val <= 0) return;

      if (val > 10) val = 10;

      if (val < 0) val = 1;

      for (let i = 0; i < val; i++) {
        array.push(i + 1);
      }
    } else {
      array = valor.split(',', 10);
      array.sort();
    }

    try {
      const permutationResult = await api.post('permutation', {
        pergenEntry: array,
      });

      setTotalPermutations(permutationResult.data);
      setPermutations((anterior) => [
        ...anterior,
        ...nextPage(permutationResult.data, 1),
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  function nextPage(items, actualPage) {
    let result = [];
    let totalPage = Math.ceil(items.length / 30);
    let count = actualPage * 30 - 30;
    let delimiter = count + 30;

    if (actualPage <= totalPage)
      for (let i = count; i < delimiter; i++)
        if (items[i] != null) result.push(items[i]);

    return result;
  }

  return (
    <>
      <div className="content content-permutation">
        <div className="app">
          <h1>Gerador de Permutações</h1>
          <div className="info">
            <p>
              Essa é uma aplicação com a finalidade de gerar permutações em
              ordem lexicográfica, tomando como base o algorítmo que consta{' '}
              <a
                href="https://www.geeksforgeeks.org/lexicographic-permutations-of-string/"
                target="_blank"
                rel="noopener noreferrer"
              >
                neste artigo
              </a>
              .
            </p>

            <p>
              Você pode escolher permutações com sistema numérico ou
              alfanumérico. Para ambos os sistemas, as permutações são de
              <strong> 1 → N</strong>, porém, por questões de desempenho,
              limitaremos a <strong>1 → 10</strong>. Para o sistema numérico,
              escolha o valor de <strong>N</strong>, para o sistema
              alfanumérico, insira os caracteres separados por vírgula ( , ).
            </p>

            <p style={{ marginTop: '2vh' }}>
              <strong>Aviso:</strong>{' '}
              <em>
                O resultado será verdadeiro desde que os caracteres
                <strong> não estejam repetidos</strong>.
              </em>
            </p>

            <form onSubmit={generateArray}>
              <select
                name="select"
                onChange={(e) => setIsNumber(e.target.value === 'true')}
              >
                <option value="true">Numérico</option>

                <option value="false">Alfanumérico</option>
              </select>
              <input
                type={isNumber ? 'number' : 'text'}
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
              <button className="button" type="submit">
                GO!
              </button>
            </form>
          </div>
        </div>

        <div className="permutations">
          <h3 id="perm-count">
            Número de permutações: {totalPermutations.length}
          </h3>

          <div className="scroll">
            <ul>
              {permutations.map((val, ind) => (
                <li key={ind}>{val}</li>
              ))}

              <div ref={scrollObserve}> </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
