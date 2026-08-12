export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type Category = {
  id: string;
  name: string;
  products: Product[];
  note?: string;
};

export const menu: Category[] = [
  {
    id: "entradas",
    name: "Entradas",
    products: [
      {
        id: "steak-tartare",
        name: "Steak Tartare",
        description:
          "200g de mignon bovino in natura picado, cebola roxa, alcaparras, azeitonas e cheiro verde. Servido com batata chips e torradas.",
        price: 65,
      },
      {
        id: "carne-de-onca",
        name: "Carne de Onça",
        description:
          "300g de carne bovina moída in natura, condimentada, acompanhada de cebola roxa, azeite de oliva, cheiro verde e pão de fermentação natural.",
        price: 65,
      },
      {
        id: "salada-premium",
        name: "Salada Premium",
        description:
          "Alface americana, tomate seco, palmito, bacon em cubos, queijo muçarela em cubos, queijo parmesão ralado, azeite de oliva, vinagre balsâmico, creme balsâmico italiano e torradas.",
        price: 49,
      },
      {
        id: "salada-do-cheff",
        name: "Salada do Cheff",
        description:
          "Alface americana, rúcula, tomate seco, tomate sweet grape, creme gorgonzola, azeite de oliva e limão.",
        price: 46,
      },
      {
        id: "escabeche",
        name: "Escabeche",
        description:
          "Fatias de lagarto em conserva, azeite de oliva, cebola, champignon, pimentão, azeitonas verdes. Servido com torradas e confit de sweet grape. Porção individual.",
        price: 35,
      },
    ],
  },
  {
    id: "espetaria",
    name: "Espetaria",
    products: [
      {
        id: "espeto-pao-de-alho",
        name: "Pão de Alho",
        description:
          "01 unidade de pão de alho Santa Massa, assado na brasa para criar uma crosta dourada e sabor inigualável.",
        price: 18,
      },
      {
        id: "espeto-queijo-coalho",
        name: "Queijo Coalho",
        description:
          "01 unidade de queijo coalho Frimesa, conhecido por sua textura sedosa e sabor refinado.",
        price: 18,
      },
      {
        id: "espeto-frango",
        name: "Frango",
        description: "Cubos de peito de frango marinado em tempero especial e grelhado na brasa.",
        price: 18,
      },
      {
        id: "espeto-coracao",
        name: "Coração",
        description: "Coração de frango grelhado na brasa.",
        price: 18,
      },
      {
        id: "espeto-alcatra",
        name: "Alcatra",
        description: "Cubos de alcatra, grelhada na brasa, com suculência e sabor irresistível.",
        price: 28,
      },
      {
        id: "espeto-cordeiro",
        name: "Cordeiro",
        description:
          "Cubos de picanha de cordeiro, grelhada na brasa, com tempero exclusivo e sabor inigualável.",
        price: 30,
      },
      {
        id: "molho-pimenta-premium",
        name: "Molho de Pimenta Premium",
        description: "Molho especial para acompanhar os espetos.",
        price: 3,
      },
      {
        id: "geleia-abacaxi-pimenta",
        name: "Geleia de Abacaxi com Pimenta",
        description: "Molho especial para acompanhar os espetos.",
        price: 4,
      },
      {
        id: "molho-rose",
        name: "Molho Rosé",
        description: "Molho especial para acompanhar os espetos.",
        price: 3,
      },
      {
        id: "chimichurri",
        name: "Molho Rosé Chimichurri",
        description: "Molho especial para acompanhar os espetos.",
        price: 3,
      },
      {
        id: "molho-barbecue",
        name: "Barbecue",
        description: "Molho especial para acompanhar os espetos.",
        price: 5,
      },
      {
        id: "molho-alho",
        name: "Molho de Alho",
        description: "Molho especial para acompanhar os espetos.",
        price: 3,
      },
    ],
  },
  {
    id: "cortes",
    name: "Cortes",
    products: [
      {
        id: "chorizo",
        name: "Chorizo",
        description:
          "Bife de chorizo bovino grelhado ao ponto desejado + acompanhamentos. Serve 02 pessoas.",
        price: 179,
      },
      {
        id: "ancho",
        name: "Ancho",
        description:
          "Bife de ancho bovino grelhado ao ponto desejado + acompanhamentos. Serve 02 pessoas.",
        price: 179,
      },
      {
        id: "prime-rib",
        name: "Prime Rib",
        description:
          "Corte da parte nobre do filé da costela bovina, grelhado na brasa ao ponto desejado + acompanhamentos. Serve 02 pessoas.",
        price: 179,
      },
      {
        id: "carre-cordeiro",
        name: "Carré de Cordeiro",
        description:
          "Cordeiro francês, grelhado na brasa ao ponto desejado + acompanhamentos. Serve 02 pessoas.",
        price: 189,
      },
      {
        id: "costela-rolete",
        name: "Costela no Rolete",
        description: "Costela bovina no rolete, desossada + acompanhamentos. Serve 02 pessoas.",
        price: 169,
      },
      {
        id: "alcatra",
        name: "Alcatra",
        description:
          "Alcatra bovina grelhada na brasa ao ponto desejado + acompanhamentos. Serve 02 pessoas.",
        price: 169,
      },
      {
        id: "fraldinha-queijos",
        name: "Fraldinha ao Molho de Queijos",
        description:
          "Fraldinha bovina, grelhada na brasa ao molho de queijos + acompanhamentos. Serve 02 pessoas.",
        price: 179,
      },
      {
        id: "medalhao-mignon",
        name: "Medalhão de Mignon",
        description:
          "Mignon bovino salteado na manteiga ao ponto desejado + acompanhamentos. Serve 02 pessoas.",
        price: 199,
      },
      {
        id: "t-bone",
        name: "T-Bone",
        description:
          "Filé mignon bovino com osso, grelhado na brasa ao ponto desejado + acompanhamentos.",
        price: 99,
      },
      {
        id: "picanha",
        name: "Picanha",
        description:
          "Picanha bovina fatiada, grelhada na brasa ao ponto desejado + acompanhamentos.",
        price: 99,
      },
    ],
    note: "Acompanha escolha de um acompanhamento: fritas/aipim/polenta, arroz/maionese de batata/farofa, ou mix de legumes salteados.",
  },
  {
    id: "porcoes",
    name: "Porções",
    products: [
      {
        id: "mignon-fritas",
        name: "Mignon com Fritas",
        description:
          "Mignon em tiras, acebolado e finalizado na chapa. Acompanhado de batatas fritas com queijo, cheiro verde e pão de fermentação natural. Serve 02 pessoas.",
        price: 169,
      },
      {
        id: "alcatra-acebolada",
        name: "Alcatra Acebolada",
        description:
          "Alcatra bovina acebolada e finalizada na chapa. Acompanhado de batatas fritas, aipim, polenta e pão de fermentação natural. Serve 02 pessoas.",
        price: 159,
      },
      {
        id: "porcao-mignon",
        name: "Porção de Mignon",
        description:
          "Mignon cortado em cubos, acebolado e finalizado na chapa. Acompanhado de pão de fermentação natural. Serve 02 pessoas.",
        price: 139,
      },
      {
        id: "bolinho-costela-10",
        name: "Bolinho de Costela (10 unidades)",
        description:
          "Bolinhos recheados com queijo muçarela e costela desfiada ao molho pardo.",
        price: 89,
      },
      {
        id: "bolinho-costela-5",
        name: "Bolinho de Costela (5 unidades)",
        description:
          "Bolinhos recheados com queijo muçarela e costela desfiada ao molho pardo.",
        price: 58,
      },
      {
        id: "polenta",
        name: "Polenta",
        description: "Polenta frita com queijo e cheiro verde. Serve 02 pessoas.",
        price: 35,
      },
      {
        id: "aipim",
        name: "Aipim",
        description: "Mandioca frita com queijo e cheiro verde. Serve 02 pessoas.",
        price: 35,
      },
      {
        id: "batata-frita",
        name: "Batata Frita",
        description: "Batatas fritas com queijo e cheiro verde. Serve 02 pessoas.",
        price: 38,
      },
      {
        id: "camarao-rosa",
        name: "Camarão Rosa",
        description: "Camarão grande empanado. Serve 02 pessoas.",
        price: 189,
      },
      {
        id: "tilapia",
        name: "Tilápia",
        description: "Tilápia à milanesa (sem glúten). Serve 02 pessoas.",
        price: 89,
      },
      {
        id: "calabresa",
        name: "Calabresa",
        description: "Calabresa fatiada, acebolada e finalizada na chapa. Serve 02 pessoas.",
        price: 55,
      },
      {
        id: "yakisoba-1",
        name: "Yakisoba (1 pessoa)",
        description: "Macarrão, molho especial, carne bovina, frango e mix de legumes.",
        price: 55,
      },
      {
        id: "yakisoba-2",
        name: "Yakisoba (2 pessoas)",
        description: "Macarrão, molho especial, carne bovina, frango e mix de legumes.",
        price: 89,
      },
      {
        id: "coxinha-asa",
        name: "Porção de Coxinha da Asa",
        description: "Serve 02 pessoas.",
        price: 59,
      },
    ],
    note: "Para meias porções, consulte as opções disponíveis.",
  },
  {
    id: "hamburgueres",
    name: "Hambúrgueres",
    products: [
      {
        id: "cheese-burger",
        name: "Cheese Burger",
        description:
          "Pão top macio, maionese artesanal, blend de costela, queijo muçarela.",
        price: 30,
      },
      {
        id: "cheese-salada",
        name: "Cheese Salada",
        description:
          "Pão top macio, maionese artesanal, blend de costela, queijo muçarela, alface americana e tomate.",
        price: 35,
      },
      {
        id: "cheese-frango",
        name: "Cheese Frango",
        description:
          "Pão top macio, maionese artesanal, peito de frango em cubos, queijo muçarela, alface americana e tomate.",
        price: 35,
      },
      {
        id: "cheese-bacon",
        name: "Cheese Bacon",
        description:
          "Pão top macio, maionese artesanal, blend de costela, queijo muçarela, bacon em cubos, alface americana e tomate.",
        price: 39,
      },
      {
        id: "cheese-calabresa",
        name: "Cheese Calabresa",
        description:
          "Pão top macio, maionese artesanal, blend de costela, queijo muçarela, calabresa, alface americana e tomate.",
        price: 40,
      },
      {
        id: "cheese-alcatra",
        name: "Cheese Alcatra",
        description:
          "Pão baguete, maionese artesanal, alcatra em tiras, queijo muçarela, cebola ao shoyu.",
        price: 42,
      },
      {
        id: "cheese-tudo",
        name: "Cheese Tudo",
        description:
          "Pão top macio, maionese artesanal, blend de costela, queijo muçarela, bacon, calabresa, ovo, alface americana e tomate.",
        price: 44,
      },
      {
        id: "premium-kids",
        name: "Premium Kids",
        description:
          "Pão top kids, maionese artesanal, queijo muçarela, blend de costela + fritas smile.",
        price: 32,
      },
      {
        id: "premium-vegetariano",
        name: "Premium Vegetariano",
        description:
          "Pão top macio, maionese artesanal, blend de legumes, queijo muçarela, rúcula, tomate seco, tomate, alface americana + fritas.",
        price: 40,
      },
      {
        id: "premium-onion",
        name: "Premium Onion",
        description:
          "Pão top macio, maionese artesanal, cheddar, blend de costela, queijo muçarela, anéis de cebola à milanesa + fritas.",
        price: 42,
      },
      {
        id: "premium",
        name: "Premium",
        description:
          "Pão top macio, maionese artesanal, blend de costela, queijo muçarela, cebola roxa, alface americana, rúcula, tomate, picles + fritas.",
        price: 42,
      },
      {
        id: "premium-chicken",
        name: "Premium Chicken",
        description:
          "Pão baguete, maionese artesanal, peito de frango em cubos, queijo muçarela, bacon em cubos, ovo, alface americana, tomate, vinagrete, picles + fritas.",
        price: 42,
      },
      {
        id: "premium-especial",
        name: "Premium Especial",
        description:
          "Pão top macio, maionese artesanal, blend de costela, queijo muçarela, bacon, ovo, cebola ao shoyu, alface americana, tomate, picles + fritas.",
        price: 42,
      },
      {
        id: "premium-costela",
        name: "Premium Costela",
        description:
          "Pão baguete, requeijão cremoso, costela desfiada, queijo muçarela, rúcula, tomate seco + fritas.",
        price: 48,
      },
      {
        id: "premium-duplo",
        name: "Premium Duplo",
        description:
          "Pão top macio, maionese artesanal, molho barbecue, 02 blend de costela, queijo muçarela, bacon, cheddar, ovo + fritas.",
        price: 50,
      },
      {
        id: "premium-mignon",
        name: "Premium Mignon",
        description:
          "Pão baguete, maionese artesanal, mignon em tiras, queijo muçarela, cebola ao shoyu, alface, tomate, picles + fritas.",
        price: 52,
      },
      {
        id: "premium-mignon-mostarda",
        name: "Premium Mignon ao Molho Mostarda",
        description:
          "Pão baguete, maionese artesanal, mignon em tiras ao molho mostarda, queijo muçarela, cebola ao shoyu, alface, tomate, picles + fritas.",
        price: 54,
      },
      {
        id: "premium-picanha",
        name: "Premium Picanha",
        description:
          "Pão baguete, maionese artesanal, picanha em tiras, queijo prato, bacon em tiras, confit de tomate sweet grape, cebola roxa + fritas.",
        price: 54,
      },
    ],
    note: "Pão sem glúten e vegano disponível. Consulte os valores na categoria Adicionais.",
  },
  {
    id: "adicionais",
    name: "Adicionais",
    products: [
      { id: "add-milho", name: "Milho", description: "", price: 5 },
      { id: "add-ovo", name: "Ovo", description: "", price: 5 },
      { id: "add-cebola-roxa", name: "Cebola Roxa", description: "", price: 5 },
      { id: "add-vinagrete", name: "Vinagrete", description: "", price: 4 },
      { id: "add-cebola-shoyu", name: "Cebola ao Shoyu", description: "", price: 4 },
      { id: "add-picles", name: "Picles", description: "", price: 4 },
      { id: "add-onion-rings", name: "Onion Rings", description: "", price: 6 },
      { id: "add-tomate-seco", name: "Tomate Seco", description: "", price: 7 },
      { id: "add-cheddar", name: "Cheddar", description: "", price: 7 },
      { id: "add-catupiry", name: "Catupiry", description: "", price: 7 },
      { id: "add-queijo-mucarela", name: "Queijo Muçarela", description: "", price: 7 },
      { id: "add-bacon-cubos", name: "Bacon em Cubos", description: "", price: 7 },
      { id: "add-cebola-caramelizada", name: "Cebola Caramelizada", description: "", price: 7 },
      { id: "add-frango", name: "Frango", description: "", price: 7 },
      { id: "add-calabresa", name: "Calabresa", description: "", price: 7 },
      { id: "add-fritas", name: "Fritas", description: "", price: 8 },
      { id: "add-queijo-s-lactose", name: "Queijo sem Lactose", description: "", price: 8 },
      { id: "add-batata-smile", name: "Batata Smile", description: "", price: 8 },
      { id: "add-hamburguer-grelhado", name: "Hambúrguer Grelhado", description: "", price: 9 },
      { id: "add-pao-s-gluten-vegano", name: "Pão sem Glúten e Vegano", description: "", price: 9 },
      {
        id: "add-hamburguer-grelhado-s-gluten",
        name: "Hambúrguer Grelhado sem Glúten",
        description: "",
        price: 10,
      },
      { id: "add-costela-desfiada", name: "Costela Desfiada", description: "", price: 15 },
      { id: "add-mignon", name: "Mignon", description: "", price: 15 },
    ],
  },
  {
    id: "sobremesas",
    name: "Sobremesas",
    products: [
      {
        id: "milk-shake",
        name: "Milk Shake",
        description: "Shake à base de sorvete de chocolate ou creme.",
        price: 28,
      },
      {
        id: "petit-gateau",
        name: "Petit Gateau",
        description: "Bolinho de chocolate com recheio cremoso e sorvete de creme.",
        price: 28,
      },
      {
        id: "cheesecake",
        name: "Cheesecake",
        description:
          "Torta com recheio cremoso de queijo, com calda de frutas vermelhas ou maracujá.",
        price: 28,
      },
      {
        id: "torta-holandesa",
        name: "Torta Holandesa",
        description: "Torta com recheio de creme holandês e cobertura de chocolate ao leite.",
        price: 28,
      },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    products: [
      { id: "coca-cola", name: "Coca-Cola", description: "Lata.", price: 8 },
      { id: "sprite", name: "Sprite", description: "Lata.", price: 8 },
      { id: "fanta", name: "Fanta", description: "Lata.", price: 8 },
      { id: "schweppes", name: "Schweppes", description: "Lata.", price: 8 },
      { id: "tonica", name: "Tônica", description: "Lata.", price: 8 },
      { id: "h2o", name: "H2O", description: "Lata.", price: 10 },
      { id: "agua-mineral", name: "Água Mineral", description: "", price: 4 },
      { id: "agua-com-gas", name: "Água com Gás", description: "", price: 4 },
      { id: "agua-de-coco", name: "Água de Coco", description: "", price: 9 },
      { id: "red-bull", name: "Red Bull 250ml", description: "", price: 16 },
      { id: "monster", name: "Monster 473ml", description: "", price: 16 },
      { id: "suco-laranja", name: "Suco Natural de Laranja", description: "", price: 12 },
      { id: "limonada-suica", name: "Limonada Suíça", description: "", price: 15 },
      {
        id: "suco-polpa-agua",
        name: "Suco com Polpa (água)",
        description: "Morango, abacaxi, abacaxi com hortelã, coco ou maracujá.",
        price: 12,
      },
      {
        id: "suco-polpa-leite",
        name: "Suco com Polpa (leite)",
        description: "Morango, abacaxi, abacaxi com hortelã, coco ou maracujá.",
        price: 15,
      },
      { id: "del-valle", name: "Del Valle", description: "Sabores variados.", price: 8 },
      { id: "suco-prats", name: "Suco Prats", description: "Laranja ou uva.", price: 10 },
    ],
  },
];

export const allProducts = menu.flatMap((c) =>
  c.products.map((p) => ({ ...p, categoryId: c.id, categoryName: c.name }))
);
