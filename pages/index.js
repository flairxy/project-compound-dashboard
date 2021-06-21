import Head from "next/head";
import Compound from "@compound-finance/compound-js";
import calculateApy from "../apy.js";
import Image from "next/image";

export default function Home({ apys }) {
  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;
  const imgLoader = ({src}) => {
    return `/img/${src}`;
  };

  return (
    <div className="container">
      <Head>
        <title>Compound dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="row mt-4">
        <div className="col-sm-12">
          <div className="jumbotron">
            <h1 className="text-center">Compound Dashboard</h1>
            <h5 className="display-4 text-center">
              Shows Compound APYs <br /> with COMP token rewards
            </h5>
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Supply APY</th>
            <th>COMP APY</th>
            <th>Total APY</th>
          </tr>
        </thead>
        <tbody>
          {apys &&
            apys.map((apy) => (
              <tr key={apy.ticker}>
                <td>
                  <Image
                    loader={imgLoader}
                    src={`${apy.ticker.toLowerCase()}.png`}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span 
                    style={{ marginLeft: 10}}> {apy.ticker.toUpperCase()} </span>
                  
                </td>
                <td>{formatPercent(apy.supplyApy)}</td>
                <td>{formatPercent(apy.compApy)}</td>
                <td>
                  {formatPercent(
                    parseFloat(apy.supplyApy) + parseFloat(apy.compApy)
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps(context) {
  const apys = await Promise.all([
    calculateApy(Compound.cDAI, "DAI"),
    calculateApy(Compound.cUSDC, "USDC"),
    calculateApy(Compound.cUSDT, "USDT"),
  ]);

  return {
    props: {
      apys,
    },
  };
}
