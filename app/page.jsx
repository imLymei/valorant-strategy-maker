'use client';

import Image from 'next/image';
import { useState } from 'react';
import Footer from './Footer';

export default function Home() {
	const [agents, setAgents] = useState([]);
	const [selected, setSelected] = useState([
		false, // Fade 		0
		false, // Breach 	1
		false, // Raze 		2
		false, // Chamber 	3
		false, // KAY/O 	4
		false, // Skye 		5
		false, // Cypher 	6
		false, // Sova 		7
		false, // Killjoy 	8
		false, // Harbor 	9
		false, // Viper 	10
		false, // Phoenix 	11
		false, // Astra 	12
		false, // Brimstone 13
		false, // Neon 		14
		false, // Yoru 		15
		false, // Sage 		16
		false, // Reyna 	17
		false, // Omen 		18
		false, // Jett 		19
	]);
	const [tactics, setTactics] = useState([false, false, false, false, false, false, false, false, false]);
	const [isHidden, setIsHidden] = useState(false);
	const [isFirstTime, setIsFirstTime] = useState(true);

	const getAgents = async () => {
		const response = await fetch(
			'https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pt-BR'
		);
		const data = await response.json();
		const agents = data.data;
		const agentsArray = Object.values(agents);
		return agentsArray;
	};

	getAgents().then((value) => {
		setAgents(value);
	});

	const handleTactics = () => {
		const newTactics = tactics.map((value, index) => {
			if (index === 0) {
				if (selected[3] || selected[6] || selected[8]) {
					// wire
					return true;
				} else return false;
			} else if (index === 1) {
				if (selected[16]) {
					// wall
					return true;
				} else return false;
			} else if (index === 2) {
				if (selected[1] || selected[4] || selected[5] || selected[11] || selected[15]) {
					// pop
					return true;
				} else return false;
			} else if (index === 3) {
				if (selected[0] || selected[2] || selected[4] || selected[7]) {
					// soft drone
					return true;
				} else return false;
			} else if (index === 4) {
				if (selected[5] || selected[7]) {
					// drone
					return true;
				} else return false;
			} else if (index === 5) {
				if (selected[9] || selected[10] || selected[12] || selected[13] || selected[18]) {
					// smoke
					return true;
				} else return false;
			} else if (index === 6) {
				if (selected[2] || selected[14] || selected[19]) {
					// entry
					return true;
				} else return false;
			} else if (index === 7) {
				if (selected[5] || selected[16]) {
					// heal
					return true;
				} else return false;
			} else if (index === 8) {
				if (selected[3] || selected[19]) {
					// op
					return true;
				} else return false;
			}
		});
		setTactics(newTactics);
		setIsFirstTime(false);
	};

	function handleClick(index) {
		const changeSelected = selected.map((value, selectedIndex) => {
			if (selectedIndex === index) {
				return !value;
			} else return value;
		});
		setSelected(changeSelected);
	}

	const handleHidden = () => {
		setIsHidden(!isHidden);
	};

	const HandleReset = () => {
		setSelected([
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
		]);
	};

	return (
		<div>
			<div className={isHidden ? 'flex text-[#e9e9e9]' : 'flex text-[#e9e9e9] max-sm:h-[120vh]'}>
				<div className={isHidden ? 'fixed' : 'max-sm:h-3'}>
					<button className='relative text-xl border rounded-sm w-8 h-8' onClick={handleHidden}>
						{isHidden ? '>' : '<'}
					</button>
					<button
						className={
							isHidden
								? 'fixed -translate-x-[200%] text-xl border rounded-sm w-8 h-8 transition-all opacity-0'
								: 'relative text-xl border rounded-sm w-8 h-8 transition-all'
						}
						onClick={HandleReset}>
						X
					</button>
					<div
						className={
							isHidden
								? 'fixed grid-cols-4 items-center justify-items-center gap-8 w-[100vw] sm:w-[40vw] h-[115vh] sm:h-[85vh] flex-none border p-6 left-0 -translate-x-full transition-all opacity-10'
								: 'grid grid-cols-4 items-center justify-items-center gap-8 w-[100vw] sm:w-[40vw] h-[115vh] sm:h-[85vh] flex-none border p-6 relative left-0 transition-all'
						}>
						{agents.map((value, index) => (
							<div
								key={index}
								className={
									selected[index]
										? 'bg-[#101010] w-[90px] h-[120px] p-2 text-center grid cursor-pointer rounded border border-[#fff] shadow-lg shadow-white/5 scale-110 transition-all'
										: 'bg-[#101010] w-[90px] h-[120px] p-2 text-center grid cursor-pointer rounded transition-all'
								}
								onClick={() => {
									handleClick(index);
								}}>
								<div>
									<Image
										src={value.displayIcon}
										alt='personagem'
										width={90}
										height={160}
										draggable={false}></Image>
								</div>
								<h3 className='self-end'>{value.displayName}</h3>
							</div>
						))}
					</div>
				</div>
				<div
					className={
						isHidden ? 'max-sm:overflow-y-hidden justify-center mx-auto p-4' : 'justify-center mx-auto p-4'
					}>
					<div className='text-center'>
						<h2 className='text-2xl my-4'>T??ticas:</h2>
						<h3 className='my-2'>
							{'Contra: '}
							{selected.map((isActive, index) => {
								if (isActive) {
									if (
										index === 2 ||
										index === 11 ||
										index === 14 ||
										index === 15 ||
										index === 17 ||
										index === 19
									) {
										return (
											<span key={index} className='text-pink-500'>
												{agents[index].displayName + ' '}
											</span>
										);
									} else if (index === 0 || index === 1 || index === 4 || index === 5 || index === 7) {
										return (
											<span key={index} className='text-yellow-500'>
												{agents[index].displayName + ' '}
											</span>
										);
									} else if (index === 3 || index === 6 || index === 8 || index === 16) {
										return (
											<span key={index} className='text-blue-500'>
												{agents[index].displayName + ' '}
											</span>
										);
									} else {
										return (
											<span key={index} className='text-orange-500'>
												{agents[index].displayName + ' '}
											</span>
										);
									}
								}
							})}
						</h3>
						<button className='hover:bg-[#121212] px-6 py-2 my-6 border rounded' onClick={handleTactics}>
							Gerar t??tica
						</button>
						<h3>Voce deve:</h3>
						<div className='shadow-lg shadow-white/5 w-[80vw] sm:w-[45vw] p-8 mx-auto my-4 rounded border'>
							{tactics.map((isActive, index) => {
								if (!isFirstTime) {
									if (isActive) {
										if (index == 0) {
											return (
												<h3 key={index} className='my-3'>
													- Eles tem <span className='text-pink-500'>Personagens</span> que utilizam{' '}
													<span className='text-blue-500'>Fios</span>.{' '}
													<span className='text-red-500'>Cuidado</span> com eles no{' '}
													<span className='text-blue-500'>Entry</span> do{' '}
													<span className='text-pink-500'>Bomb</span> no{' '}
													<span className='text-pink-500'>Ataque</span>. Durante a{' '}
													<span className='text-pink-500'>Defesa</span> as{' '}
													<span className='text-blue-500'>Costas</span> n??o v??o ter{' '}
													<span className='text-pink-500'>Jogadores</span>, mas sim{' '}
													<span className='text-blue-500'>Fios</span>.
												</h3>
											);
										} else if (index == 1) {
											return (
												<h3 key={index} className='my-3'>
													- Eles provavelmente v??o <span className='text-blue-500'>Fechar</span> o{' '}
													<span className='text-pink-500'>Meio</span> ou um{' '}
													<span className='text-pink-500'>Bomb</span> com a{' '}
													<span className='text-blue-500'>Parede</span> na{' '}
													<span className='text-pink-500'>Defesa</span>, ?? poss??vel esperar ela cair para
													fazer um <span className='text-blue-500'>Entry r??pido</span>. Durante o{' '}
													<span className='text-pink-500'>Ataque</span> a{' '}
													<span className='text-blue-500'>Parede</span> vai ser usada para{' '}
													<span className='text-blue-500'>Parar rota????es</span> ou{' '}
													<span className='text-blue-500'>Permitir o Entry</span> no{' '}
													<span className='text-pink-500'>Bomb</span> de forma segura. Tente prever a
													localiza????o da <span className='text-blue-500'>Parede</span> e{' '}
													<span className='text-blue-500'>Puni-los</span>.
												</h3>
											);
										} else if (index == 2) {
											return (
												<h3 key={index} className='my-3'>
													- Eles tem <span className='text-blue-500'>Pop flash</span>,{' '}
													<span className='text-red-500'>Cuidado</span> com as{' '}
													<span className='text-blue-500'>Smokes</span> e{' '}
													<span className='text-pink-500'>Locais fechados</span>, eles podem{' '}
													<span className='text-blue-500'>Usar essas posi????es</span> para{' '}
													<span className='text-blue-500'>Cegar seu time</span> de forma{' '}
													<span className='text-blue-500'>Segura</span>.
												</h3>
											);
										} else if (index == 3) {
											return (
												<h3 key={index} className='my-3'>
													- <span className='text-red-500'>Cuidado</span> com os{' '}
													<span className='text-blue-500'>Semi drones</span>, eles{' '}
													<span className='text-blue-500'>Revelam</span> sua{' '}
													<span className='text-pink-500'>Posi????o</span> de forma{' '}
													<span className='text-blue-500'>Parcial</span>. Podem ser usados como{' '}
													<span className='text-blue-500'>Bait</span>.
												</h3>
											);
										} else if (index == 4) {
											return (
												<h3 key={index} className='my-3'>
													- <span className='text-pink-500'>Cuidado</span> com os{' '}
													<span className='text-blue-500'>Drones</span>, eles{' '}
													<span className='text-blue-500'>Revelam</span> sua{' '}
													<span className='text-pink-500'>Posi????o</span>{' '}
													<span className='text-blue-500'>Totalmente</span> e com o{' '}
													<span className='text-blue-500'>Controle do inimigo</span>. Podem ser usados como{' '}
													<span className='text-blue-500'>Bait</span>, mas s??o{' '}
													<span className='text-blue-500'>Muito mais dif??ceis</span> de se enganar.
												</h3>
											);
										} else if (index == 5) {
											return (
												<h3 key={index} className='my-3'>
													- Eles tem <span className='text-blue-500'>Smoke</span>, portanto{' '}
													<span className='text-blue-500'>Operators</span>{' '}
													<span className='text-red-500'>N??o v??o funcionar</span> de{' '}
													<span className='text-pink-500'>Lugares ??bvios</span>, al??m de{' '}
													<span className='text-blue-500'>Facilitar</span> o{' '}
													<span className='text-pink-500'>Entry</span> no{' '}
													<span className='text-pink-500'>Ataque</span> e{' '}
													<span className='text-blue-500'>Facilitar</span> a{' '}
													<span className='text-blue-500'>Segurada</span> do{' '}
													<span className='text-pink-500'>Bomb</span> na{' '}
													<span className='text-pink-500'>Defesa</span>.
												</h3>
											);
										} else if (index == 6) {
											return (
												<h3 key={index} className='my-3'>
													- Eles tem <span className='text-blue-500'>Personagens</span> que fazem o{' '}
													<span className='text-pink-500'>Entry</span> de forma{' '}
													<span className='text-blue-500'>Muito r??pida</span>, ent??o{' '}
													<span className='text-red-500'>Evite</span>{' '}
													<span className='text-pink-500'>Confronto direto</span> com eles e{' '}
													<span className='text-blue-500'>puna</span> os outros{' '}
													<span className='text-pink-500'>Atacantes</span>.
												</h3>
											);
										} else if (index == 7) {
											return (
												<h3 key={index} className='my-3'>
													- Eles tem <span className='text-blue-500'>Curandeiros</span>, portanto{' '}
													<span className='text-pink-500'>Danos baixos</span> ser??o{' '}
													<span className='text-red-500'>Irrelevantes</span>. Tente fazer{' '}
													<span className='text-pink-500'>50/50</span> caso esteja com{' '}
													<span className='text-blue-500'>Pouca vida</span>.
												</h3>
											);
										} else if (index == 8) {
											return (
												<h3 key={index} className='my-3'>
													- Eles tem <span className='text-blue-500'>Personagens ??timos</span> para{' '}
													<span className='text-blue-500'>Operator</span>, use suas{' '}
													<span className='text-blue-500'>Smokes</span> para{' '}
													<span className='text-pink-500'>Negar</span> essa{' '}
													<span className='text-pink-500'>Vantagem</span>.
												</h3>
											);
										}
									} else {
										if (index == 0) {
											return (
												<h3 key={index} className='my-3'>
													- Eles <span className='text-red-500'>N??o</span> tem{' '}
													<span className='text-blue-500'>Personagens</span> que utilizam{' '}
													<span className='text-blue-500'>Fios</span>. As{' '}
													<span className='text-pink-500'>Costas</span> provavelmente v??o ser{' '}
													<span className='text-pink-500'>Vigiadas</span> por{' '}
													<span className='text-blue-500'>Jogadores</span>, ent??o{' '}
													<span className='text-red-500'>Sempre</span> ande com a{' '}
													<span className='text-blue-500'>Arma na m??o</span>.
												</h3>
											);
										} else if (index == 1) {
											return (
												<h3 key={index} className='my-3'>
													- Eles <span className='text-red-500'>N??o</span> tem{' '}
													<span className='text-blue-500'>Habilidades</span> para{' '}
													<span className='text-pink-500'>Isolar uma ??rea</span> no mapa com{' '}
													<span className='text-blue-500'>Paredes</span>, Aproveite essa{' '}
													<span className='text-pink-500'>Desvantagem</span> para{' '}
													<span className='text-blue-500'>Puni-los</span> de{' '}
													<span className='text-pink-500'>V??rios ??ngulos</span>.
												</h3>
											);
										} else if (index == 2) {
											return (
												<h3 key={index} className='my-3'>
													- Eles <span className='text-red-500'>N??o</span> tem{' '}
													<span className='text-blue-500'>Pop flash</span>, portanto as{' '}
													<span className='text-blue-500'>Smokes</span> s??o sua{' '}
													<span className='text-pink-500'>Maior vantagens</span>.
												</h3>
											);
										} else if (index == 3) {
											return (
												<h3 key={index} className='my-3'>
													- Eles <span className='text-red-500'>N??o</span> tem como obter{' '}
													<span className='text-blue-500'>Informa????es r??pidas</span> da sua{' '}
													<span className='text-pink-500'>Localiza????o</span> com{' '}
													<span className='text-blue-500'>Semi drones</span>, ent??o voc?? deve jogar{' '}
													<span className='text-pink-500'>Marcando ??ngulos</span> de maneira{' '}
													<span className='text-pink-500'>Incomum</span> e jogar nas{' '}
													<span className='text-blue-500'>Smokes</span>.
												</h3>
											);
										} else if (index == 4) {
											return (
												<h3 key={index} className='my-3'>
													- Eles <span className='text-red-500'>N??o</span> tem como utilizar{' '}
													<span className='text-blue-500'>Drones</span> para pegar{' '}
													<span className='text-blue-500'>Informa????es confi??veis</span> sobre sua{' '}
													<span className='text-pink-500'>Posi????o</span>,{' '}
													<span className='text-red-500'>N??o</span> tenha medo de{' '}
													<span className='text-pink-500'>Segurar Off-angle</span> ou ficar entre{' '}
													<span className='text-blue-500'>Smokes</span>.
												</h3>
											);
										} else if (index == 5) {
											return (
												<h3 key={index} className='my-3'>
													- Eles <span className='text-red-500'>N??o</span> tem{' '}
													<span className='text-pink-500'>Controladores</span>, Utilize{' '}
													<span className='text-blue-500'>Marshals e Operators</span>
													para ter <span className='text-blue-500'>Vantagem</span> principalmente na{' '}
													<span className='text-pink-500'>Defesa</span>.
												</h3>
											);
										} else if (index == 6) {
											return (
												<h3 key={index} className='my-3'>
													- Eles <span className='text-red-500'>N??o</span> tem{' '}
													<span className='text-blue-500'>Personagens</span> que fa????o um{' '}
													<span className='text-pink-500'>Entry r??pido</span>, ent??o{' '}
													<span className='text-red-500'>N??o</span> tenha medo de lutar com todos.{' '}
													<span className='text-red-500'>MAS N??O SE ESQUE??A DE ISOLAR OS 1v1s</span>.
												</h3>
											);
										} else if (index == 7) {
											return (
												<h3 key={index} className='my-3'>
													- Eles <span className='text-red-500'>N??o</span> tem{' '}
													<span className='text-pink-500'>Cura</span>, ent??o{' '}
													<span className='text-blue-500'>Jogar com danos baixos</span> pode ser uma boa
													<span className='text-pink-500'>Estrat??gia</span>.{' '}
													<span className='text-red-500'>N??o</span> tenha medo de fazer{' '}
													<span className='text-pink-500'>Trades</span> com{' '}
													<span className='text-blue-500'>Pouca vida</span>.
												</h3>
											);
										} else if (index == 8) {
											return (
												<h3 key={index} className='my-3'>
													- Eles <span className='text-red-500'>N??o</span> tem{' '}
													<span className='text-blue-500'>Personagens</span> que s??o{' '}
													<span className='text-pink-500'>Bons com Operators</span>, ent??o{' '}
													<span className='text-red-500'>N??o</span> se preocupe com{' '}
													<span className='text-pink-500'>Snipers</span>. Caso encontre algum apenas fa??a um
													<span className='text-pink-500'>Jump pick</span> para{' '}
													<span className='text-blue-500'>Tira-lo</span> do{' '}
													<span className='text-pink-500'>Pixel</span> ou utilize{' '}
													<span className='text-blue-500'>Smokes</span> para{' '}
													<span className='text-pink-500'>For??ar um reposicionamento</span>.
												</h3>
											);
										}
									}
								} else {
									return (
										<h3 key={index} className={index === 0 ? '' : 'fixed opacity-0'}>
											<span className='text-pink-500'>Selecione</span> os{' '}
											<span className='text-blue-500'>Personagens</span> do time{' '}
											<span className='text-pink-500'>Inimigo</span> e{' '}
											<span className='text-blue-500'>Click</span> no{' '}
											<span className='text-pink-500'>Bot??o</span> de{' '}
											<span className='text-blue-500'>Gerar t??tica</span>.
										</h3>
									);
								}
							})}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
