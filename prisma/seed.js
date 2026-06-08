import pg from 'pg';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL não está definida');
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Limpando o banco de dados...');

    await prisma.simulados.deleteMany();
    await prisma.conteudos.deleteMany();
    await prisma.comunidade.deleteMany();
    await prisma.personagem.deleteMany();
    await prisma.livro.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.equipe.deleteMany();
    await prisma.sobre.deleteMany();

    console.log('📦 Inserindo Equipe...');

    await prisma.equipe.createMany({
    data: [
        {
            nome_equipe: 'Equipe DevStone',
            nome: 'Danilo Jorge',
            curso: 'Desenvolvimento de sistemas.',
            curso_en: 'Systems development.',
            funcao: 'Product Owner',
            descricao: 'Responsável pelo desenvolvimento do projeto e documentação.',
            descricao_en: 'Responsible for project development and documentation.',
            foto: 'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/danilo.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9kYW5pbG8uanBnIiwiaWF0IjoxNzgwNzk3OTE0LCJleHAiOjE4MTIzMzM5MTR9.OSSlHCY-JDHjUpfrcxHwI9Zs_nMkcd3uUkb8zLAa-u4',
        },
        {
            nome_equipe: 'Equipe DevStone',
            nome: 'Fabio Trevizolli',
            curso: 'Desenvolvimento de sistemas.',
            curso_en: 'Systems development.',
            funcao: 'Scrum Master',
            descricao: 'Garante a organização do time seguindo princípios e práticas do framework scrum.',
            descricao_en: 'Ensures the team is organized by following the principles and practices of the Scrum framework.',
            foto: 'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/fabio.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9mYWJpby5wbmciLCJpYXQiOjE3ODA3OTgwMzQsImV4cCI6MTgxMjMzNDAzNH0.N_CkeIKAlC3FeAG8StCzJ5uLcTewgqnifMbbymQlJMw',
        },
        {
            nome_equipe: 'Equipe DevStone',
            nome: 'Yasmin Oliveira',
            curso: 'Desenvolvimento de sistemas.',
            curso_en: 'Systems development.',
            funcao: 'Developer',
            descricao: 'Responsável pelo desenvolvimento do sistema Back-end',
            descricao_en: 'Responsible for the development of back-end system.',
            foto: 'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/yasmin.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy95YXNtaW4uanBnIiwiaWF0IjoxNzgwNzk3NTk5LCJleHAiOjE4MTIzMzM1OTl9.cMtSJhY5ePUn0mPCfmROnFsu89V_GCEb2sE92-UGV3Q',
        },
        {
            nome_equipe: 'Equipe DevStone',
            nome: 'Murilo Brustolin',
            curso: 'Desenvolvimento de sistemas.',
            curso_en: 'Systems development.',
            funcao: 'Developer Full Stack',
            descricao: 'Responsável pelo desenvolvimento do Back-end and organização do banco de dados.',
            descricao_en: 'Responsible for back-end development and database organization.',
            foto: 'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/murilo.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9tdXJpbG8uanBnIiwiaWF0IjoxNzgwNzk3NjMxLCJleHAiOjE4MTIzMzM2MzF9.5ty8pleP_2qqCwpq1usSvDkxO2F3rH6maHMWSDrRD6o',
        },
        {
            nome_equipe: 'Equipe DevStone',
            nome: 'Rebeca Alves',
            curso: 'Desenvolvimento de sistemas.',
            curso_en: 'Systems development.',
            funcao: 'Developer',
            descricao: 'Responsável pelo desenvolvimento do Front-end e prototipação do Figma.',
            descricao_en: 'Responsible for front-end development and prototyping in Figma.',
            foto: 'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/rebeca.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9yZWJlY2EuanBnIiwiaWF0IjoxNzgwNzk3OTkxLCJleHAiOjE4MTIzMzM5OTF9.-00ARjn9cUaNJwaWLPebKPnOoLHaU5nBt1FEUSbP0RU',
        },
        {
            nome_equipe: 'Equipe DevStone',
            nome: 'Luiz Felipe',
            curso: 'Desenvolvimento de sistemas.',
            curso_en: 'Systems development.',
            funcao: 'Developer',
            descricao: 'Responsável pela prototipação do Figma e organização do progresso do projeto no Trello.',
            descricao_en: 'Responsible for Figma prototyping and organizing project progress in Trello.',
            foto: 'https://ibb.co/RTmD1Xs0',
        },
        {
            nome_equipe: 'Equipe DevStone',
            nome: 'Helena Rossi',
            curso: 'Eletro-eletrônica.',
            curso_en: 'Electrical and electronic engineering.',
            funcao: 'Leitor e Analista',
            descricao: 'Responsável pela leitura do livro e por repassar seus conhecimentos e informações necessárias.',
            descricao_en: 'Responsible for reading the book and passing on the necessary knowledge and information.',
            foto: 'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/helena.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9oZWxlbmEucG5nIiwiaWF0IjoxNzgwNzk2NTU5LCJleHAiOjE4MTIzMzI1NTl9.z8yfagoyIXY0I1vzofBR9ktPWW4Z-0TwkEAtO5CFb7I',
        },
        {
            nome_equipe: 'Equipe DevStone',
            nome: "Leonardo Sant'anna",
            curso: 'Mecânica.',
            curso_en: 'Mechanics.',
            funcao: 'Leitor e Analista',
            descricao: 'Responsável pela leitura do livro e por repassar seus conhecimentos e informações necessárias.',
            descricao_en: 'Responsible for reading the book and passing on the necessary knowledge and information.',
            foto: 'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/leo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9sZW8ucG5nIiwiaWF0IjoxNzgwNzk3MTA5LCJleHAiOjE4MTIzMzMxMDl9.a_jJqpSAmYVzIKj87p4mDsGJRantVjk9ELHiFFU4Uj0',
        },
        {
            nome_equipe: 'Equipe DevStone',
            nome: 'Arthur Napolli',
            curso: 'Eletro-eletrônica.',
            curso_en: 'Electrical and electronic engineering.',
            funcao: 'Leitor e Analista',
            descricao: 'Responsável pela leitura do livro e por repassar seus conhecimentos e informações necessárias.',
            descricao_en: 'Responsible for reading the book and passing on the necessary knowledge and information..',
            foto: 'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/napoli.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9uYXBvbGkucG5nIiwiaWF0IjoxNzgwNzk3NDA5LCJleHAiOjE4MTIzMzM0MDl9.4-WZe8gV_C1cdEo65AAiKa8TbW5G15vib6DImHBNfnI',
        },
        {
            nome_equipe: 'Equipe DevStone',
            nome: 'Matheus Lima',
            curso: 'Mecânica.',
            curso_en: 'Mechanics.',
            funcao: 'Leitor e Analista',
            descricao: 'Responsável pela leitura do livro e por repassar seus conhecimentos e informações necessárias.',
            descricao_en: 'Responsible for reading the book and passing on the necessary knowledge and information..',
            foto: 'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/matheus.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9tYXRoZXVzLnBuZyIsImlhdCI6MTc4MDc5Njc2OSwiZXhwIjoxODEyMzMyNzY5fQ.S0eRM3NxlyJDVjSBmqS43ao-is7Q4JhYNlZ5cRQGxA8',
        },
    ],
});
 

    console.log('👥 Inserindo Usuários...');

    await prisma.usuario.createMany({
        data: [
            {
                nome: 'Ivonete',
                idade: 25,
                email: 'ivonete@gmail.com',
                username: 'ivonete',
                senha: 'IvoneteOtimaProfessora',
                descricao: 'Professora de português.',
                descricao_en: 'Portuguese teacher',
            },
            {
                nome: 'Danilo Jorge',
                idade: 17,
                email: 'danilo@gmail.com',
                username: 'Danilo',
                senha: '12345',
                descricao: 'Estudante.',
                descricao_en: 'Student.',
            },
        ],
    });

    console.log('ℹ️ Inserindo Sobre...');

    await prisma.sobre.createMany({
        data: [
            {
                pergunta: 'O que é o ClubeLivro?',
                pergunta_en: 'What is ClubeLivro?',
                descricao:
                    'Uma plataforma educativa focada na difusão da literatura nacional brasileira através de resumos detalhados, análises literárias e simulados interativos.',
                descricao_en:
                    'An educational platform focused on disseminating Brazilian national literature through detailed summaries, literary analysis, and interactive mock exams.',
            },
            {
                pergunta: 'Como usar os simulados?',
                pergunta_en: 'How to use the mock exams?',
                descricao:
                    'Os simulados são provas interativas que ajudam a consolidar o aprendizado. Responda as questões, receba feedback imediato e veja explicações detalhadas.',
                descricao_en:
                    'Mock exams are interactive tests that help consolidate learning. Answer questions, receive immediate feedback, and see detailed explanations.',
            },
            {
                pergunta: 'Quais são os autores abordados?',
                pergunta_en: 'What authors are covered?',
                descricao:
                    'Focamos em autores clássicos e modernistas da literatura brasileira, incluindo José Lins do Rego, Clarice Lispector, Jorge Amado, Machado de Assis e muitos outros.',
                descricao_en:
                    'We focus on classic and modernist authors of Brazilian literature, including José Lins do Rego, Clarice Lispector, Jorge Amado, Machado de Assis, and many others.',
            },
        ],
    });

    console.log('📚 Inserindo Livro 1: O Caminho de Pedras...');

    const livro1 = await prisma.livro.create({
        data: {
            titulo: 'O Caminho de Pedras',
            capa: 'https://m.media-amazon.com/images/I/718Cw8G6OmL.jpg',
            autor: 'Rachel de Queiroz',
            detalhesAutor:
                'Rachel de Queiroz (1910-2003) foi uma grande escritora, jornalista, tradutora e dramaturga brasileira. Ganhou diversos prêmios, dentre eles o "Prêmio Camões" aos 81 anos, sendo portanto, a primeira mulher a recebê-lo. Além disso, foi a primeira mulher a ocupar uma cadeira na Academia Brasileira de Letras, em 1977. Foi militante política e afiliada ao Partido Comunista Brasileiro. Foi casada duas vezes, seu primeiro marido foi o poeta José Auto da Cruz Oliveira, e após a separação casou-se com o médico Oyama de Macedo.',
            detalhesAutor_en:
                'Rachel de Queiroz (1910-2003) was a great Brazilian writer, journalist, translator, and playwright. She won numerous awards, including the Camões Prize at the age of 81, becoming the first woman to receive it. Furthermore, she was the first woman to hold a seat in the Brazilian Academy of Letters, in 1977. She was a political activist and affiliated with the Brazilian Communist Party. She was married twice; her first husband was the poet José Auto da Cruz Oliveira, and after their separation, she married the physician Oyama de Macedo.',
            anoPublicacao: 1936,
            genero: 'Ficção Política',
            genero_en: 'Political Fiction',
            resumo: 'Caminho de Pedras narra a história de Noemi, uma mulher casada com João Jaques, mas que vive um relacionamento sem felicidade e marcado pela rotina. Sua vida começa a mudar quando ela conhece Roberto, um jornalista e militante político envolvido com movimentos socialistas e lutas trabalhistas. Com o passar do tempo, Noemi se aproxima de Roberto e acaba se apaixonando por ele. Esse relacionamento faz com que ela enfrente conflitos emocionais e morais, além do julgamento da sociedade conservadora da época, que condenava mulheres que desrespeitavam os padrões tradicionais do casamento. Enquanto desenvolve o drama amoroso da protagonista, o livro também retrata a realidade social e política do Brasil nos anos 1930, durante a Era Vargas. A narrativa mostra perseguições políticas, desigualdade social, pobreza e dificuldades enfrentadas pelos trabalhadores nordestinos. Rachel de Queiroz utiliza uma linguagem simples e realista para abordar temas como liberdade feminina, injustiça social, política e os desafios de quem tenta buscar independência em uma sociedade cheia de preconceitos e limitações.',
            resumo_en:
                'Caminho de Pedras tells the story of Noemi, a married woman who lives in an unhappy and routine relationship with her husband, João Jaques. Her life begins to change when she meets Roberto, a journalist and political activist involved with socialist movements and workers’ struggles. As time passes, Noemi grows closer to Roberto and eventually falls in love with him. This relationship causes emotional and moral conflicts, as well as judgment from the conservative society of the time, which condemned women who broke traditional marriage standards. While developing the protagonist’s love drama, the novel also portrays the social and political reality of Brazil in the 1930s, during the Vargas Era. The narrative shows political persecution, social inequality, poverty, and the difficulties faced by Northeastern workers. Rachel de Queiroz uses a simple and realistic language to address themes such as female freedom, social injustice, politics, and the challenges of seeking independence in a society full of prejudice and limitations.',
            contexto:
                'Forte influência do período pós-Revolução de 1930, retratando a polarização Caminho de Pedras foi publicado em 1937, durante o governo de Getúlio Vargas, em um período marcado por grandes mudanças políticas, sociais e econômicas no Brasil. A década de 1930 foi caracterizada pelo fortalecimento do poder do governo, pela censura e pela perseguição a grupos políticos considerados perigosos, principalmente socialistas e comunistas. Nesse período, o Brasil enfrentava problemas como pobreza, desigualdade social e dificuldades econômicas, especialmente no Nordeste. Os trabalhadores viviam em condições difíceis e muitos movimentos operários surgiam para lutar por melhores condições de vida e trabalho. Essas tensões aparecem no livro por meio dos personagens ligados à política e às causas sociais. Além disso, a sociedade da época era bastante conservadora, principalmente em relação ao papel da mulher. As mulheres tinham pouca liberdade e eram pressionadas a seguir padrões tradicionais de casamento e comportamento. Por isso, a personagem Noemi representa o conflito entre os desejos pessoais e as regras impostas pela sociedade. O contexto histórico da obra ajuda a explicar os temas principais do romance, como repressão política, desigualdade social, liberdade feminina e crítica à sociedade brasileira dos anos 1930.política no Brasil e a organização da classe trabalhadora.',
            contexto_en:
                'Caminho de Pedras was published in 1937, during the government of Getúlio Vargas, in a period marked by major political, social, and economic changes in Brazil. The 1930s were characterized by the strengthening of government power, censorship, and the persecution of political groups considered dangerous, especially socialists and communists. During this period, Brazil faced problems such as poverty, social inequality, and economic difficulties, especially in the Northeast region. Workers lived under harsh conditions, and many labor movements emerged to fight for better living and working conditions. These tensions appear in the novel through characters connected to politics and social causes. In addition, society at that time was very conservative, especially regarding the role of women. Women had little freedom and were pressured to follow traditional standards of marriage and behavior. Because of this, the character Noemi represents the conflict between personal desires and the rules imposed by society. The historical context of the novel helps explain its main themes, such as political repression, social inequality, female freedom, and criticism of Brazilian society in the 1930s.',
            estiloEscrita:
                'O estilo de escrita de Rachel de Queiroz em Caminho de Pedras integra-se à vertente do verismo realista, alimentando-se de realidades concretas, nítidas e frequentemente cruas. Essa economia de palavras resulta em uma inesquecível força dramática, onde o cenário de Fortaleza na década de 1930 é construído através de sensações táteis e olfativas, como o sol que queima nas calçadas o cheiro de adega e comida abafada das pensões e o mormaço que vence os personagens como uma dormideira. Sua prosa é descrita como limpa e precisa, o que confere à narrativa uma inesquecível força dramática. Rachel combina a observação profunda da psicologia dos personagens com uma perspectiva social marcante, focando em dramas humanos e questões coletivas. Ela é considerada uma narradora nata, cuja escrita na ficção e na crônica gira em torno de figuras humanas, problemas do cotidiano e dramas sociais, seja no sertão nordestino ou no ambiente urbano.',
            estiloEscrita_en:
                'The writing style of Rachel de Queiroz in Caminho de Pedras is connected to the tradition of realist verismo, drawing from concrete, vivid, and often harsh realities. This economy of words creates an unforgettable dramatic strength, where the setting of Fortaleza in the 1930s is built through tactile and olfactory sensations, such as the sun that “burns on the sidewalks,” the “smell of wine cellars and stale food” in boarding houses, and the oppressive heat that overwhelms the characters like a “sleep-inducing numbness.” Her prose is described as clean and precise, which gives the narrative a remarkable dramatic intensity. Rachel combines deep psychological observation of her characters with a strong social perspective, focusing on human struggles and collective issues. She is considered a natural storyteller whose fiction and chronicles revolve around human figures, everyday problems, and social dramas, whether in the northeastern Brazilian countryside or in urban environments.',
            enredo: 'Caminho de Pedras acompanha a vida de Noemi, uma mulher casada que vive um relacionamento infeliz e monótono com seu marido, João Jaques. Sua vida muda quando ela conhece Roberto, um jornalista e militante político envolvido com movimentos socialistas e lutas trabalhistas. Com o tempo, Noemi e Roberto se aproximam e acabam se apaixonando. O relacionamento dos dois provoca conflitos emocionais e sociais, pois a sociedade conservadora da época condenava mulheres que rompiam os padrões tradicionais do casamento. Enquanto conta a história amorosa de Noemi, o romance também retrata a realidade política e social do Brasil nos anos 1930, mostrando pobreza,  desigualdade social, perseguições políticas e as dificuldades enfrentadas pelos trabalhadores nordestinos. Ao longo da narrativa, Noemi enfrenta dúvidas, sofrimento e julgamentos sociais enquanto tenta encontrar liberdade e felicidade. Rachel de Queiroz mistura romance e crítica social para mostrar os conflitos e desafios da sociedade brasileira daquele período. Acompanha a trajetória de Roberto, um jovem idealista que se envolve com o movimento comunista, e a tensão entre as novas ideologias e as velhas estruturas de poder.',
            enredo_en:
                'Caminho de Pedras follows the life of Noemi, a married woman who lives in an unhappy and monotonous relationship with her husband, João Jaques. Her life changes when she meets Roberto, a journalist and political activist involved with socialist movements and workers’ struggles. As time passes, Noemi and Roberto grow closer and eventually fall in love. Their relationship creates emotional and social conflicts, since the conservative society of the time condemned women who broke traditional marriage standards. While telling Noemi’s love story, the novel also portrays the political and social reality of Brazil in the 1930s, showing poverty, social inequality, political persecution, and the difficulties faced by workers in the Northeast region. Throughout the narrative, Noemi faces doubts, suffering, and social judgment while trying to find freedom and happiness. Rachel de Queiroz combines romance and social criticism to portray the conflicts and challenges of Brazilian society during that period.Follows the trajectory of Roberto, a young idealist who gets involved with the communist movement, and the tension between new ideologies and old power structures.',
            verossimilhanca:
                'Mostrado nas reuniões das personagens para planejar e recrutar membros para o partido comunista, reforçando sempre a revolução. “O operário é que deve guiar o operário, e não elemento estranho a classe!” Evidenciado com a prisão de Roberto e alguns outros camaradas pelos soldados. “Em torno dele a multidão se debatia em fuga, empurrava-se era toda um só grito e um só pavor. E os soldados iam navegando por entre a massa, cavando caminho a espaldeiradas, como remadores desesperados sobre um mar de tempestade”. Exibido pela constante tentativa de comando de João Jaques tratando-se da conduta de sua esposa. “As mulheres daqui ainda não estão maduras para a luta... Confundem questão social com questão sexual”. Trabalhadores de baixa renda retratados sempre fadigados de uma rotina monótona de suas tarefas do trabalho, e a difícil busca de ocupação durante o desemprego. “Ficou a palavra: “auxílio”. É verdade, ia precisar de auxílio. Ia ter que viver à custa de Roberto, até arranjar outro emprego.”',
            verossimilhanca_en:
                'Shown through the characters’ meetings to plan and recruit members for the CommunistParty, constantly reinforcing the idea of revolution.“The worker himself must guide the worker, and not someone outside the class!” Highlighted by the arrest of Roberto and some other comrades by soldiers. “Around him the crowd struggled in flight, pushing against itself, all reduced to a single cry and a single terror. And the soldiers moved through the mass, forcing their way with blows from their rifles, like desperate rowers upon a stormy sea.” Displayed through João Jaques’s constant attempts to control his wife’s behavior. “The women here are still not ready for the struggle… They confuse social issues with sexual issues.” Low-income workers are portrayed as constantly exhausted by the monotonous routine of their jobs and by the difficult search for work during unemployment. “One word remained: ‘assistance.’ It was true, she would need assistance. She would have to live at Roberto’s expense until she could find another job.”',
            caracteristicasLiterarias:
                'A escrita da Rachel é super direta. Ela não fica enrolando com descrições gigantescas ou choradeira barata. Quando uma coisa triste acontece — como a morte do filho da Noemi —, ela te dá um soco no estômago com frases curtas e realistas. O tom é quase o de um jornalista contando os fatos. Os personagens não são robôs guiados pelo destino. Eles erram, têm dúvidas e tomam decisões sabendo que vão se ferrar. A Noemi sabe o tamanho do escândalo que vai causar ao largar o marido, mas escolhe ir mesmo assim. Todo mundo ali tem uma bagagem psicológica bem humana. Essa é a jogada mais genial do livro. A Rachel usa duas roupas para explicar o racha no movimento: Os Gravatas: A galera intelectual, de classe média, que adora ficar discutindo teoria política no sofá, mas que na hora do vamos ver, é cheia de vaidade e preconceito. Os Tamancos: O operário da fábrica, que mal tem o que comer e que quer a revolução porque a vida dele está um inferno hoje, não porque leu Karl Marx. Sabe aquele filme onde o herói ganha no final, a polícia é derrotada e todo mundo comemora? Esquece. O livro é o oposto disso. O movimento falha porque a galera bate cabeça, o líder é preso e a revolução dá errado. O "heroísmo" no livro não é salvar o mundo, é a Noemi conseguir levantar da cama no dia seguinte para continuar vivendo.  A Rachel faz uma crítica pesada a como a sociedade dos anos 30 tratava as mulheres. A Noemi não sofre só porque a polícia persegue o namorado dela; ela sofre porque o mundo julga cada passo que ela dá como mulher. E o mais louco: mesmo os caras "revolucionários" e moderninhos da história dão suas escorregadas machistas.',
            caracteristicasLiterarias_en:
                'Rachel´s writing is incredibly direct. She doesn´t beat around the bush with lengthy descriptions or cheap whining. When something sad happens—like the death of Noemi´s son—she punches you in the gut with short, realistic sentences. The tone is almost like a journalist reporting the facts. The characters aren´t robots guided by fate. They make mistakes, have doubts, and make decisions knowing they´ll get screwed. Noemi knows the magnitude of the scandal she´ll cause by leaving her husband, but she chooses to go anyway. Everyone there has a very human psychological baggage. That´s the book´s most brilliant move. Rachel uses two outfits to explain the split in the movement: The Ties: The intellectual, middle-class crowd who love to discuss political theory on the couch, but who, when push comes to shove, are full of vanity and prejudice. The Clogs: The factory worker, who barely has enough to eat and wants revolution because his life is hell today, not because he read Karl Marx. You know those movies where the hero wins in the end, the police are defeated, and everyone celebrates? Forget it. The book is the opposite of that. The movement fails because people clash, the leader is arrested, and the revolution goes wrong. The "heroism" in the book isn´t about saving the world, it´s about Noemi managing to get out of bed the next day to keep living. Rachel makes a harsh critique of how 1930s society treated women. Noemi doesn´t just suffer because the police are chasing her boyfriend; she suffers because the world judges every step she takes as a woman. And the craziest thing: even the "revolutionary" and modern guys in the story have their sexist slips.',
            conclusao:
                'Em nossa leitura do livro "Caminho de Pedras" , interpretamos a obra não apenas como um registro da militância clandestina na Fortaleza de 1930, mas como um profundo testemunho da resiliência humana frente à derrota. O livro revela o conflito entre a fria teoria ideológica e a crueza da realidade, onde a desconfiança entre intelectuais e operários os gravata  e os tamanco  que expõe como as convicções políticas muitas vezes esbarram no sentimentalismo humano. A jornada de Noemi personifica o verdadeiro caminho de pedra : ela atravessa o estigma do adultério, a perda trágica do filho Guri e a dispersão de seus companheiros sob a repressão do Estado. Para o nosso grupo, o desfecho da obra não foca na vitória de uma causa, mas na resistência biológica e afetiva. Ao subir a ladeira do Gasômetro sozinha e grávida, Noemi transforma sua dor em uma caminhada persistente, ela ampara o ventre e chama o futuro filho de companheiro , simbolizando que, mesmo quando as instituições e os homens falham, a vida insiste em avançar sobre as asperezas do caminho.',
            conclusao_en:
                'In our reading of the book "Caminho de Pedras" (Paths of Stones), we interpret the work not only as a record of clandestine activism in Fortaleza in 1930, but as a profound testament to human resilience in the face of defeat. The book reveals the conflict between cold ideological theory and the harshness of reality, where the distrust between intellectuals and workers—the "tie-wearing" and the "clog-wearing"—exposes how political convictions often clash with human sentimentality. Noemi´s journey embodies the true path of stone: she traverses the stigma of adultery, the tragic loss of her son Guri, and the dispersal of her companions under state repression. For our group, the ending of the work does not focus on the victory of a cause, but on biological and emotional resistance. As she climbed the Gasometer hill alone and pregnant, Noemi transformed her pain into a persistent walk; she supported her belly and called her future child her companion, symbolizing that, even when institutions and men fail, life insists on moving forward despite the hardships of the path.',
        },
    });

    await prisma.personagem.createMany({
        data: [
            {
                nome: 'Roberto',
                aparencia: 'Jovem de feições marcadas pelo cansaço e pela determinação.',
                aparencia_en: 'Young man with features marked by fatigue and determination.',
                descricao: 'Militante idealista que busca organizar a classe operária na cidade.',
                descricao_en:
                    'Idealistic militant who seeks to organize the working class in the city.',
                resumo: 'É o fio condutor das tensões políticas da obra, representando a nova força revolucionária.',
                resumo_en:
                    'He is the guiding thread of the political tensions in the work, representing the new revolutionary force.',
                importancia: 'Protagonista ideológico da narrativa.',
                importancia_en: 'Ideological protagonist of the narrative.',
                idLivro: livro1.id,
            },
            {
                nome: 'Dona Amélia',
                aparencia: 'Mulher madura, com ar matriarcal e autoritário.',
                aparencia_en: 'Mature woman with a matriarchal and authoritarian air.',
                descricao: 'Patroa tradicional que representa a velha ordem patriarcal.',
                descricao_en: 'Traditional boss who represents the old patriarchal order.',
                resumo: 'Conflita ideologicamente com Roberto, representando o atraso e a resistência ao novo.',
                resumo_en:
                    'Ideologically conflicts with Roberto, representing backwardness and resistance to change.',
                importancia: 'Antagonista social.',
                importancia_en: 'Social antagonist.',
                idLivro: livro1.id,
            },
        ],
    });

    await prisma.conteudos.createMany({
        data: [
            {
                idDoLivro: livro1.id,
                dicaTitulo: 'Resumo por Arthur Napoli',
                dicaTitulo_en: 'Summary by Arthur Napoli',
                tipo: 'Vídeo',
                tipo_en: 'Video',
                descricaoDica: 'Vídeo explicativo e resumo do livro O Caminho de Pedras, apresentado em inglês por Arthur Napoli.',
                descricaoDica_en: 'Explanatory video and summary of the book O Caminho de Pedras, presented in English by Arthur Napoli.',
                curtidasDica: 0,
                material: 'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/Caminho-de-pedras-napoli.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9DYW1pbmhvLWRlLXBlZHJhcy1uYXBvbGkubXA0IiwiaWF0IjoxNzgwODc4MzE0LCJleHAiOjE4MTI0MTQzMTR9.KocoAoMwWjZi_Dy-CztPblnhlmYs1ydGVG-fyfYdIJY',
            },
            {
                idDoLivro: livro1.id,
                dicaTitulo: 'Resumo por Matheus Lima',
                dicaTitulo_en: 'Summary by Matheus Lima',
                tipo: 'Vídeo',
                tipo_en: 'Video',
                descricaoDica: 'Vídeo explicativo e resumo do livro O Caminho de Pedras, apresentado em português por Matheus Lima.',
                descricaoDica_en: 'Explanatory video and summary of the book O Caminho de Pedras, presented in Portuguese by Matheus Lima.',
                curtidasDica: 0,
                material: 'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/Caminho-de-pedras-matheus.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9DYW1pbmhvLWRlLXBlZHJhcy1tYXRoZXVzLm1wNCIsImlhdCI6MTc4MDg3ODUxMSwiZXhwIjoxODEyNDE0NTExfQ.Z9YLUuoSwdnX6AQxZIetmTbueDg5CmKOF44qdj5qmjQ',
            },
        ],
    });

 await prisma.simulados.createMany({
    data: [
        {
            idLivro: livro1.id.toString(), 
            pergunta:
                'Diferente dos primeiros livros do "Ciclo da Cana-de-Açúcar", qual é o foco principal de "O Caminho de Pedras"?',
            pergunta_en:
                'Unlike the first books in the "Sugarcane Cycle", what is the main focus of "The Path of Stones"?',
            respostaCorreta:
                'O surgimento do movimento operário, do comunismo e as tensões políticas no ambiente urbano.',
            respostaCorreta_en:
                'The emergence of the labor movement, communism, and political tensions in the urban environment.',
            respostasErradas: [
                'A vida dos senhores de engenho e a decadência da aristocracia rural.',
                'A fuga de retirantes da seca nordestina em direção à Floresta Amazônica.',
                'O misticismo religioso e o cangaço como formas de salvação no sertão.',
            ],
            respostasErradas_en: [
                'The lives of the plantation owners and the decline of the rural aristocracy.',
                'The flight of migrants from the Northeastern drought towards the Amazon Rainforest.',
                'Religious mysticism and banditry (cangaço) as forms of salvation in the backlands.',
            ],
            explicacao:
                'Em "O Caminho de Pedras", José Lins do Rego abandona temporariamente os engenhos para retratar a cidade, focando nas greves e no engajamento político e operário (comunismo) da década de 1930.',
            explicacao_en:
                'In "The Path of Stones", José Lins do Rego temporarily abandons the sugar mills to depict the city, focusing on strikes and the political and working-class engagement (communism) of the 1930s.',
        },
        {
            idLivro: livro1.id.toString(), 
            pergunta:
                'Qual é a principal característica do estilo de escrita de José Lins do Rego em "O Caminho de Pedras"?',
            pergunta_en:
                'What is the main characteristic of José Lins do Rego\'s writing style in "The Path of Stones"?',
            respostaCorreta:
                'Prosa fluida e oralizada com forte traço neorrealista e engajamento social.',
            respostaCorreta_en:
                'Fluid and oralized prose with strong neorealist traits and social engagement.',
            respostasErradas: [
                'Escrita hermética e experimental com referências psicanalíticas.',
                'Estilo pomposo e barroco típico de romances históricos.',
                'Linguagem coloquial desorganizada sem estrutura narrativa clara.',
            ],
            respostasErradas_en: [
                'Hermetic and experimental writing with psychoanalytic references.',
                'Pompous and Baroque style typical of historical novels.',
                'Disorganized colloquial language without clear narrative structure.',
            ],
            explicacao:
                'José Lins do Rego utiliza uma linguagem próxima da oralidade, caracterizando-se pelo realismo cru e pelo compromisso com a representação das questões sociais, marcas do romance de 30.',
            explicacao_en:
                'José Lins do Rego uses language close to orality, characterized by raw realism and commitment to representing social issues, marks of the 1930s novel.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'Em qual cenário geográfico e político a narrativa principal de "O Caminho de Pedras" se desenvolve?',
            pergunta_en:
                'In which geographic and political setting does the main narrative of "O Caminho de Pedras" take place?',
            respostaCorreta:
                'Fortaleza, durante as agitações e a clandestinidade dos movimentos esquerdistas na década de 1930.',
            respostaCorreta_en:
                'Fortaleza, during the unrest and clandestinity of leftist movements in the 1930s.',
            respostasErradas: [
                'O sertão central do Ceará, focando exclusivamente na seca de 1915 e na migração.',
                'Recife, detalhando as revoltas açucareiras e o fim do ciclo do café.',
                'Rio de Janeiro, abordando a efervescência cultural e a Revolta da Vacina.',
            ],
            respostasErradas_en: [
                'The central backlands of Ceará, focusing exclusively on the 1915 drought and migration.',
                'Recife, detailing the sugar revolts and the end of the coffee cycle.',
                'Rio de Janeiro, addressing cultural effervescence and the Vaccine Revolt.',
            ],
            explicacao:
                'A obra retrata as reuniões e a militância de militantes de esquerda em Fortaleza no ano de 1935.',
            explicacao_en:
                'The work depicts meetings and activism of leftist militants in Fortaleza in 1935.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'Qual é a principal ruptura que a protagonista Noemi realiza na trama?',
            pergunta_en:
                'What is the main rupture that the protagonist Noemi makes in the plot?',
            respostaCorreta:
                'Ela abandona o marido burguês e o filho pequeno para viver um amor com o militante Roberto.',
            respostaCorreta_en:
                'She abandons her bourgeois husband and small child to live a love affair with the militant Roberto.',
            respostasErradas: [
                'Ela viaja para a Europa com o objetivo de estudar artes e se afastar da política.',
                'Ela decide se tornar freira para fugir da perseguição política da polícia getulista.',
                'Ela trai os segredos do partido comunista para salvar a vida de seu pai doente.',
            ],
            respostasErradas_en: [
                'She travels to Europe to study arts and distance herself from politics.',
                'She decides to become a nun to escape political persecution by the Getulist police.',
                'She betrays the Communist Party secrets to save her sick father.',
            ],
            explicacao:
                'A decisão de Noemi choca a sociedade moralista da época, unindo a busca pela emancipação feminina ao ideal político.',
            explicacao_en:
                'Noemi s decision shocks the moralistic society of the time, combining the search for female emancipation with a political ideal.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'Como se caracteriza a trajetória do personagem Roberto na história?',
            pergunta_en:
                'How is the trajectory of the character Roberto characterized in the story?',
            respostaCorreta:
                'Ele é um idealista convicto que acaba preso pela polícia política, sofrendo as consequências de seu engajamento.',
            respostaCorreta_en:
                'He is a convinced idealist who ends up arrested by the political police, suffering the consequences of his engagement.',
            respostasErradas: [
                'Ele foge para os Estados Unidos logo no início das investigações policiais, abandonando Noemi.',
                'Ele enriquece ao se aliar aos grandes proprietários de terras locais, traindo o movimento operário.',
                'Ele descobre ser filho biológico do governador do estado e assume um cargo público de prestígio.',
            ],
            respostasErradas_en: [
                'He flees to the United States at the start of the police investigations, abandoning Noemi.',
                'He becomes rich by allying with the large local landowners, betraying the workers movement.',
                'He discovers he is the biological son of the state governor and assumes a prestigious public office.',
            ],
            explicacao:
                'Roberto encarna o sacrifício e as duras provações impostas pela repressão aos que lutavam contra o regime vigente.',
            explicacao_en:
                'Roberto embodies sacrifice and the harsh trials imposed by repression on those who fought against the ruling regime.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'Quem representa o medo da denúncia e a fragilidade psicológica diante da perseguição política do regime varguista?',
            pergunta_en:
                'Who represents the fear of denunciation and psychological fragility in the face of political persecution by the Vargas regime?',
            respostaCorreta:
                'Geraldo, que, apesar de simpatizar com a causa operária, afasta-se do grupo por pavor de perder seu emprego público e ser fichado pela polícia.',
            respostaCorreta_en:
                'Geraldo, who despite sympathizing with the workers cause, distances himself from the group for fear of losing his public job and being recorded by the police.',
            respostasErradas: [
                'Almério, um tipógrafo idoso que se recusa a rodar os panfletos do partido por não acreditar mais na revolução.',
                'Dona Rita, senhoria da pensão onde os jovens se reúnem, que os expulsa imediatamente ao descobrir panfletos subversivos embaixo do colchão.',
                'Tenente Januário, um militar infiltrado nas reuniões clandestinas que finge ser operário para colher informações para a delegacia de ordem política.',
            ],
            respostasErradas_en: [
                'Almerio, an elderly typesetter who refuses to run the party leaflets because he no longer believes in the revolution.',
                'Dona Rita, the boarding house landlady who immediately expels them after finding subversive leaflets under the mattress.',
                'Lieutenant Januario, a military man infiltrated in clandestine meetings pretending to be a worker to gather information for the political order police.',
            ],
            explicacao:
                'O personagem Geraldo exemplifica o conflito da classe média ou de trabalhadores comuns da época: a simpatia velada pelos ideais de esquerda versus o pânico real da perda de subsistência e da violência estatal.',
            explicacao_en:
                'The character Geraldo exemplifies the conflict of the middle class or ordinary workers of the time: a veiled sympathy for leftist ideals versus the real panic of losing subsistence and facing state violence.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'Qual característica da Segunda Fase do Modernismo está fortemente presente em "Caminho de Pedras"?',
            pergunta_en:
                'Which characteristic of the Second Phase of Modernism is strongly present in "Caminho de Pedras"?',
            respostaCorreta:
                'O romance social de denúncia, que utiliza uma linguagem direta e coloquial para expor as injustiças e a realidade regional.',
            respostaCorreta_en:
                'The social denunciation novel, which uses a direct and colloquial language to expose injustices and regional reality.',
            respostasErradas: [
                'O nacionalismo ufanista, que exalta as belezas naturais e a perfeicao da sociedade brasileira de forma idealizada.',
                'O experimentalismo radical da linguagem, com o uso de colagens, ausencia de pontuacao e versos livres na prosa.',
                'O resgate de valores classicos e a fuga da realidade atraves do bucolismo e do arcadismo.',
            ],
            respostasErradas_en: [
                'Jingoistic nationalism that exalts natural beauties and idealizes Brazilian society.',
                'Radical experimentalism of language, with collages, absence of punctuation and free verse in prose.',
                'The rescue of classical values and escape from reality through bucolism and arcadism.',
            ],
            explicacao:
                'A geração de 30 focava no realismo, no determinismo social e na critica às estruturas politicas e economicas do pais.',
            explicacao_en:
                'The 1930s generation focused on realism, social determinism, and critique of the country s political and economic structures.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'Qual acontecimento sela o sofrimento de Noemi no terco final do livro?',
            pergunta_en:
                'Which event seals Noemi s suffering in the final third of the book?',
            respostaCorreta:
                'A morte de seu filho doente, enquanto ela se encontrava afastada e desprovida de apoio.',
            respostaCorreta_en:
                'The death of her sick son while she was away and without support.',
            respostasErradas: [
                'A descoberta de que Roberto mantinha outra familia em uma cidade vizinha.',
                'O confisco de todos os seus bens e livros pelo governo federal.',
                'Sua propria condenacao ao exilio perpetuo na Ilha de Fernando de Noronha.',
            ],
            respostasErradas_en: [
                'The discovery that Roberto had another family in a nearby town.',
                'The confiscation of all her assets and books by the federal government.',
                'Her own condemnation to perpetual exile on Fernando de Noronha Island.',
            ],
            explicacao:
                'A perda do filho eh o ponto culminante da dor de Noemi, intensificando o peso de suas escolhas e o preco cobrado pela sociedade.',
            explicacao_en:
                'The loss of her son is the culminating point of Noemi s pain, intensifying the weight of her choices and the price charged by society.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'O que o titulo "Caminho de Pedras" simboliza dentro do contexto da obra?',
            pergunta_en:
                'What does the title "Caminho de Pedras" symbolize within the context of the work?',
            respostaCorreta:
                'A jornada ardua, cheia de obstaculos intransponiveis e sacrificios daqueles que optam pela contestacao social.',
            respostaCorreta_en:
                'The arduous journey, full of insurmountable obstacles and sacrifices of those who choose social contestation.',
            respostasErradas: [
                'A pavimentacao e o progresso industrial que Fortaleza experimentava na modernizacao de suas ruas.',
                'A busca mineralogica por pedras preciosas no interior do Ceara por parte dos operarios.',
                'A rigidez e a falta de sentimentos dos militantes, que agiam de forma fria como pedras.',
            ],
            respostasErradas_en: [
                'The paving and industrial progress that Fortaleza experienced in modernizing its streets.',
                'The mineralogical search for precious stones in the interior of Ceara by the workers.',
                'The rigidity and lack of feelings of the militants, who acted coldly like stones.',
            ],
            explicacao:
                'O titulo alude as dificuldades severas encontradas pelos idealistas na tentativa de mudar uma estrutura social rigida.',
            explicacao_en:
                'The title alludes to the severe difficulties encountered by idealists in attempting to change a rigid social structure.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'A partir da leitura do trecho e da análise integral da obra, observa-se que o conflito central vivido por Roberto e Noemi estrutura-se em torno da:',
            pergunta_en:
                'Based on the excerpt and the full analysis of the work, the central conflict experienced by Roberto and Noemi is structured around:',
            respostaCorreta:
                'Impossibilidade de conciliar a pureza do sentimento amoroso com a crueza e as exigências da militância política clandestina.',
            respostaCorreta_en:
                'The impossibility of reconciling the purity of the loving feeling with the harshness and demands of clandestine political militancy.',
            respostasErradas: [
                'Subordinação total dos sentimentos individuais aos interesses econômicos da burguesia industrial cearense.',
                'Busca por uma fuga mística e religiosa como única saída para a opressão policial da época.',
                'Indiferença de ambos perante as injustiças sociais do Nordeste, priorizando o individualismo burguês.',
            ],
            respostasErradas_en: [
                'Total subordination of individual feelings to the economic interests of the Ceará industrial bourgeoisie.',
                'A search for mystical and religious escape as the only way out of the police oppression of the time.',
                'Indifference of both to the social injustices of the Northeast, prioritizing bourgeois individualism.',
            ],
            explicacao:
                'O romance vive no cabo de guerra entre a urgência da revolução social e as necessidades afetivas individuais; assim, a alternativa A é a correta.',
            explicacao_en:
                'The novel dwells in the tug-of-war between the urgency of social revolution and individual affective needs; therefore, option A is correct.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'A respeito da construção das personagens masculinas em Caminho de Pedras, é correto afirmar que Rachel de Queiroz:',
            pergunta_en:
                'Regarding the construction of male characters in Caminho de Pedras, it is correct to state that Rachel de Queiroz:',
            respostaCorreta:
                'Expõe o machismo e o convencionalismo que atravessam tanto o ambiente burguês tradicional quanto, muitas vezes, o próprio meio da militância de esquerda.',
            respostaCorreta_en:
                'Exposes the machismo and conventionalism that cross both the traditional bourgeois environment and, often, the milieu of leftist militancy itself.',
            respostasErradas: [
                'Idealiza a figura do militante político como um herói desprovido de falhas ou contradições morais.',
                'Retrata João Jacques como um vilão cruel e violento, justificando o adultério de Noemi apenas por vias físicas.',
                'Demonstra que a solidariedade de classe anula completamente os ciúmes e as disputas afetivas entre os personagens.',
            ],
            respostasErradas_en: [
                'Idealizes the figure of the political militant as a hero without flaws or moral contradictions.',
                'Portrays João Jacques as a cruel and violent villain, justifying Noemi s adultery solely on physical grounds.',
                'Demonstrates that class solidarity completely nullifies jealousy and affective disputes among the characters.',
            ],
            explicacao:
                'Rachel mostra que o machismo permeia tanto o ambiente burguês quanto setores da militância, tornando a alternativa C correta.',
            explicacao_en:
                'Rachel shows that machismo permeates both the bourgeois environment and sectors of the militancy, making option C correct.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'Ao abandonar o casamento com João Jacques para viver com Roberto, socialmente Noemi enfrenta:',
            pergunta_en:
                'By abandoning her marriage to João Jacques to live with Roberto, socially Noemi faces:',
            respostaCorreta:
                'Marginalização social, perda da guarda do filho e o julgamento moral de uma sociedade profundamente patriarcal.',
            respostaCorreta_en:
                'Social marginalization, loss of custody of her child, and moral judgment from a deeply patriarchal society.',
            respostasErradas: [
                'Ascensão econômica imediata devido ao apoio financeiro do partido político.',
                'Reconhecimento público como heroína da emancipação feminina pelas elites locais.',
                'Isolamento total em uma comunidade rural isolada, longe de qualquer contato urbano.',
            ],
            respostasErradas_en: [
                'Immediate economic rise due to financial support from the political party.',
                'Public recognition as a heroine of female emancipation by the local elites.',
                'Total isolation in a rural community, far from any urban contact.',
            ],
            explicacao:
                'Ao romper com convenções, Noemi sofre ostracismo e penalidades sociais; logo, a alternativa B é correta.',
            explicacao_en:
                'By breaking conventions, Noemi suffers ostracism and social penalties; therefore, option B is correct.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'O destino trágico das crianças na narrativa funciona como metáfora para:',
            pergunta_en:
                'The tragic fate of children in the narrative functions as a metaphor for:',
            respostaCorreta:
                'A crueza de uma realidade social em que os mais inocentes e vulneráveis pagam o preço mais alto pelo conflito e pela miséria.',
            respostaCorreta_en:
                'The harshness of a social reality in which the most innocent and vulnerable pay the highest price for conflict and misery.',
            respostasErradas: [
                'A fragilidade dos laços familiares no ambiente rural.',
                'O castigo divino imputado às personagens por suas escolhas ideológicas e sexuais.',
                'A necessidade de militarização da infância para a proteção do Estado.',
            ],
            respostasErradas_en: [
                'The fragility of family ties in the rural environment.',
                'Divine punishment attributed to the characters for their ideological and sexual choices.',
                'The need for militarization of childhood for the protection of the State.',
            ],
            explicacao:
                'A morte infantil é o ápice da denúncia social do romance, mostrando o preço pago pelos inocentes; alternativa C é correta.',
            explicacao_en:
                'Child death is the apex of the social denunciation of the novel, showing the price paid by the innocent; option C is correct.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'Considerando o contexto histórico (1937), o romance capta a atmosfera de um período marcado por:',
            pergunta_en:
                'Considering the historical context (1937), the novel captures the atmosphere of a period marked by:',
            respostaCorreta:
                'Polarização ideológica, avanço do autoritarismo (governo Vargas) e violenta repressão aos movimentos de esquerda.',
            respostaCorreta_en:
                'Ideological polarization, the advance of authoritarianism (Vargas government) and violent repression of leftist movements.',
            respostasErradas: [
                'Intensa efervescência democrática, com total liberdade de expressão e voto universal.',
                'Estabilidade política absoluta e ausência de conflitos sociais ou greves operárias.',
                'Descentralização do poder político, com fortalecimento das oligarquias cafeeiras paulistas.',
            ],
            respostasErradas_en: [
                'Intense democratic effervescence, with total freedom of expression and universal suffrage.',
                'Absolute political stability and absence of social conflicts or workers strikes.',
                'Decentralization of political power, with strengthening of the São Paulo coffee oligarchies.',
            ],
            explicacao:
                '1937 é o ano do golpe do Estado Novo; o romance reflete a polarização e repressão da época, portanto alternativa B é correta.',
            explicacao_en:
                '1937 is the year of the Estado Novo coup; the novel reflects the polarization and repression of the time, therefore option B is correct.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'No final do romance, o sentimento predominante diante das prisões, desilusões e perdas é de:',
            pergunta_en:
                'At the end of the novel, the predominant feeling in the face of arrests, disillusionments and losses is one of:',
            respostaCorreta:
                'Melancolia, dor e um sentimento de quase derrota, contrabalançado pela persistência silenciosa no "caminho de pedras".',
            respostaCorreta_en:
                'Melancholy, pain and a feeling of near defeat, counterbalanced by the silent persistence on the "path of stones".',
            respostasErradas: [
                'Triunfo político imediato e celebração da vitória sobre as forças opressoras.',
                'Conversão coletiva das personagens ao modelo de vida burguês e capitalista.',
                'Indiferença absoluta dos sobreviventes em relação ao destino de seus companheiros presos.',
            ],
            respostasErradas_en: [
                'Immediate political triumph and celebration of victory over oppressive forces.',
                'Collective conversion of the characters to the bourgeois and capitalist way of life.',
                'Absolute indifference of the survivors regarding the fate of their imprisoned companions.',
            ],
            explicacao:
                'O final privilegia a melancolia e o cansaço, com uma persistência resignada; alternativa B é correta.',
            explicacao_en:
                'The ending favors melancholy and exhaustion, with a resigned persistence; option B is correct.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'A presença da polícia e do aparato repressor do Estado em Caminho de Pedras evidencia:',
            pergunta_en:
                'The presence of the police and the State s repressive apparatus in Caminho de Pedras evidences:',
            respostaCorreta:
                'Uma crítica à violência institucionalizada e arbitrária que esmagava as liberdades individuais e os movimentos sociais.',
            respostaCorreta_en:
                'A critique of institutionalized and arbitrary violence that crushed individual liberties and social movements.',
            respostasErradas: [
                'Uma exaltação das forças de segurança como garantidoras da paz social e da justiça no Nordeste.',
                'A total incompetência da polícia, que nunca conseguia localizar os panfletos ou os militantes.',
                'O caráter pacífico e dialogal das autoridades da época frente às greves operárias.',
            ],
            respostasErradas_en: [
                'An exaltation of the security forces as guarantors of social peace and justice in the Northeast.',
                'The total incompetence of the police, which never managed to locate the leaflets or militants.',
                'The peaceful and dialogic character of the authorities of the time in the face of workers strikes.',
            ],
            explicacao:
                'O romance denuncia a violência institucional e as prisões arbitrárias como forma de calar a contestação social; alternativa A é correta.',
            explicacao_en:
                'The novel denounces institutional violence and arbitrary arrests as a way to silence social protest; option A is correct.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta: 'Quem é a autora de Caminho de Pedras?',
            pergunta_en: 'Who is the author of Caminho de Pedras?',
            respostaCorreta: 'Rachel de Queiroz',
            respostaCorreta_en: 'Rachel de Queiroz',
            respostasErradas: [
                'Clarice Lispector',
                'Cecília Meireles',
                'Lygia Fagundes Telles',
            ],
            respostasErradas_en: [
                'Clarice Lispector',
                'Cecília Meireles',
                'Lygia Fagundes Telles',
            ],
            explicacao: 'Rachel de Queiroz foi uma importante escritora brasileira do Modernismo e autora de Caminho de Pedras.',
            explicacao_en: 'Rachel de Queiroz was an important Brazilian Modernist writer and the author of Caminho de Pedras.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta: 'Em que ano o livro foi publicado?',
            pergunta_en: 'In what year was the book published?',
            respostaCorreta: '1937',
            respostaCorreta_en: '1937',
            respostasErradas: ['1922', '1945', '1956'],
            respostasErradas_en: ['1922', '1945', '1956'],
            explicacao: 'O romance foi publicado em 1937, período marcado por tensões políticas e sociais no Brasil.',
            explicacao_en: 'The novel was published in 1937, during a period of political and social tensions in Brazil.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta: 'Quem é a protagonista da história?',
            pergunta_en: 'Who is the protagonist of the story?',
            respostaCorreta: 'Noemi',
            respostaCorreta_en: 'Noemi',
            respostasErradas: ['Maria', 'Conceição', 'Joana'],
            respostasErradas_en: ['Maria', 'Conceição', 'Joana'],
            explicacao: 'Noemi é a personagem principal e sua trajetória é o foco central da narrativa.',
            explicacao_en: 'Noemi is the main character, and her experiences drive the plot of the novel.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta: 'Qual tema é fortemente abordado na obra?',
            pergunta_en: 'Which theme is strongly addressed in the book?',
            respostaCorreta: 'Conflitos políticos e sociais',
            respostaCorreta_en: 'Political and social conflicts',
            respostasErradas: ['Fantasia e magia', 'Viagens espaciais', 'Mitologia grega'],
            respostasErradas_en: ['Fantasy and magic', 'Space travel', 'Greek mythology'],
            explicacao: 'O livro trata de questões políticas, desigualdades sociais e dos desafios enfrentados pelos personagens.',
            explicacao_en: 'The novel explores political issues, social inequality, and the struggles faced by its characters.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta: 'Em qual período histórico se passa a narrativa?',
            pergunta_en: 'During which historical period does the story take place?',
            respostaCorreta: 'Década de 1930',
            respostaCorreta_en: 'The 1930s',
            respostasErradas: ['Ditadura Militar (1964-1985)', 'Brasil Colonial', 'Século XXI'],
            respostasErradas_en: ['Brazilian Military Dictatorship (1964–1985)', 'Colonial Brazil', 'The 21st century'],
            explicacao: 'A história ocorreu na década de 1930, época de grandes transformações políticas e sociais no Brasil.',
            explicacao_en: 'The narrative takes place in the 1930s, a time of major political and social changes in Brazil.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta: 'O título Caminho de Pedras simboliza:',
            pergunta_en: 'What does the title Caminho de Pedras ("Path of Stones") symbolize?',
            respostaCorreta: 'Os obstáculos e dificuldades enfrentados pelos personagens.',
            respostaCorreta_en: 'The obstacles and difficulties faced by the characters',
            respostasErradas: ['Uma estrada construída de pedras.', 'A riqueza dos personagens.', 'Uma viagem turística.'],
            respostasErradas_en: ['A road made of stones', "The characters' wealth", 'A tourist trip'],
            explicacao: 'O título representa as dificuldades, desafios e conflitos encontrados pelos personagens ao longo de suas vidas.',
            explicacao_en: 'The title symbolizes the hardships, challenges, and conflicts experienced by the characters.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta: 'Qual característica de Noemi é destacada no livro?',
            pergunta_en: 'Which characteristic of Noemi is highlighted in the novel?',
            respostaCorreta: 'Busca por liberdade e independência.',
            respostaCorreta_en: 'Her search for freedom and independence',
            respostasErradas: ['Desejo de ser rainha.', 'Interesse por aventuras sobrenaturais.', 'Vontade de morar em outro planeta.'],
            respostasErradas_en: ['Her desire to become a queen', 'Her interest in supernatural adventures', 'Her wish to live on another planet'],
            explicacao: 'Noemi é retratada como uma mulher que busca autonomia, liberdade e realização pessoal.',
            explicacao_en: 'Noemi is portrayed as a woman seeking autonomy, freedom, and personal fulfillment.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'Publicado em 1937, o romance Caminho de Pedras marca uma fase específica da produção de Rachel de Queiroz. Sobre a inserção da obra no panorama literário brasileiro, é correto afirmar que:',
            pergunta_en:
                'Published in 1937, the novel Caminho de Pedras marks a specific phase in Rachel de Queiroz’s production. Regarding the work’s placement in the Brazilian literary landscape, it is correct to state that:',
            respostaCorreta:
                'Trata-se de um exemplar do romance social da década de 30, integrando-se à vertente do verismo realista que explora dramas sociais e realidades nítidas.',
            respostaCorreta_en:
                'It is an example of the social novel of the 1930s, aligning with the realist verismo movement that explores social dramas and stark realities.',
            respostasErradas: [
                'O livro pertence à primeira fase do Modernismo, focando no experimentalismo linguístico e na ruptura com o passado colonial.',
                'A obra foca exclusivamente no tema da seca e do retirante nordestino, repetindo a estrutura narrativa de sua obra de estreia, O Quinze.',
                'É um romance de caráter romântico-idealista, onde a militância política serve apenas como pano de fundo para um amor impossível e heroico.',
            ],
            respostasErradas_en: [
                'The book belongs to the first phase of Modernism, focusing on linguistic experimentalism and a break with the colonial past.',
                'The work focuses exclusively on the themes of drought and the Northeastern migrant, repeating the narrative structure of her debut work, O Quinze.',
                'It is a romantic-idealistic novel, where political activism serves merely as a backdrop for an impossible and heroic love.',
            ],
            explicacao:
                'A obra se integra à vertente do verismo realista do romance de 30, com observação psicológica aguda e perspectiva social marcante.',
            explicacao_en:
                'The work integrates into the realist verismo strand of 1930s novels, with sharp psychological observation and a striking social perspective.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'No capítulo 2, durante a reunião clandestina, ocorre um embate entre Roberto e o operário Vinte-e-Um. Esse conflito revela uma das tensões centrais da obra, que é:',
            pergunta_en:
                'In Chapter 2, during the clandestine meeting, a clash occurs between Roberto and the worker Twenty-One. This conflict reveals one of the work s central tensions, which is:',
            respostaCorreta:
                'A desconfiança mútua entre os intelectuais (“de gravata”) e os proletários (“de tamanco”), onde o operário reivindica o direito de se guiar por si mesmo.',
            respostaCorreta_en:
                'The mutual distrust between the intellectuals (“in ties”) and the proletarians (“in clogs”), where the worker claims the right to guide himself.',
            respostasErradas: [
                'A submissão total dos operários aos intelectuais, vistos como os únicos capazes de liderar a revolução.',
                'A união harmônica e imediata de todas as classes sociais em prol de um objetivo comum em Fortaleza.',
                'A recusa dos intelectuais em participar de tarefas práticas, preferindo apenas a teoria acadêmica.',
            ],
            respostasErradas_en: [
                'The total submission of the workers to the intellectuals, seen as the only ones capable of leading the revolution.',
                'The harmonious and immediate union of all social classes in pursuit of a common goal in Fortaleza.',
                'The refusal of intellectuals to participate in practical tasks, preferring only academic theory.',
            ],
            explicacao:
                'O operário Vinte-e-Um questiona a classe de Roberto e afirma que o operário deve guiar o operário, revelando a divisão entre “gravatas” e “tamancos”.',
            explicacao_en:
                'The worker Twenty-One questions Roberto s class and states that the worker must guide the worker, revealing the division between “ties” and “clogs.”',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'A prosa de Rachel de Queiroz em Caminho de Pedras é frequentemente descrita como possuindo a “naturalidade do essencial”. Essa característica se manifesta no livro através de:',
            pergunta_en:
                'Rachel de Queiroz s prose in Caminho de Pedras is often described as possessing the “naturalness of the essential.” This characteristic manifests itself in the book through:',
            respostaCorreta:
                'Um estilo despojado e depurado, que evita ornamentos para focar na agudeza da observação psicológica e social.',
            respostaCorreta_en:
                'A stripped-down and refined style that avoids embellishments to focus on the sharpness of psychological and social observation.',
            respostasErradas: [
                'Um texto rebuscado, com uso excessivo de adjetivos e metáforas complexas.',
                'Uma narrativa lenta e descritiva que prioriza a natureza em detrimento da figura humana.',
                'O uso constante de gírias estrangeiras, refletindo a influência direta da literatura francesa do século XIX.',
            ],
            respostasErradas_en: [
                'A flowery text, with excessive use of adjectives and complex metaphors.',
                'A slow, descriptive narrative that prioritizes nature over the human figure.',
                'The constant use of foreign slang, reflecting the direct influence of 19th-century French literature.',
            ],
            explicacao:
                'A prosa de Rachel é reconhecida pelo estilo despojado e depurado, evitando ornamentos e gerando força dramática.',
            explicacao_en:
                'Rachel s prose is recognized for its stripped-down and refined style, avoiding embellishments and generating dramatic force.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'A morte do personagem Guri e a posterior gravidez de Noemi sugerem que:',
            pergunta_en:
                'The death of the character Guri and Noemi s subsequent pregnancy suggest that:',
            respostaCorreta:
                'A resistência humana e a continuidade da vida (maternidade) se sobrepõem à desolação da derrota política e da perda pessoal.',
            respostaCorreta_en:
                'Human resilience and the continuity of life (motherhood) overcome the desolation of political defeat and personal loss.',
            respostasErradas: [
                'Noemi desistiu de seus ideais políticos para se dedicar exclusivamente à dor do luto.',
                'A tragédia pessoal de Noemi é um castigo moral por ter abandonado o seu casamento com João Jaques.',
                'A vida clandestina é incompatível com a maternidade, levando Noemi a entregar seu novo filho para a mãe de um companheiro.',
            ],
            respostasErradas_en: [
                'Noemi gave up her political ideals to devote herself exclusively to the pain of mourning.',
                'Noemi s personal tragedy is a moral punishment for having abandoned her marriage to João Jaques.',
                'Life in hiding is incompatible with motherhood, leading Noemi to give her new son to a comrade s mother.',
            ],
            explicacao:
                'A cena final simboliza a fusão entre afeto materno e persistência política, mostrando resistência biológica diante da derrota.',
            explicacao_en:
                'The final scene symbolizes the fusion of maternal affection and political persistence, showing biological resistance in the face of defeat.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'O episódio do comício na Praça da Estação (Capítulo 12) descreve:',
            pergunta_en:
                'The episode of the rally at Praça da Estação (Chapter 12) describes:',
            respostaCorreta:
                'A manifestação é interrompida pela cavalaria policial, gerando pânico, prisões (incluindo a de Roberto) e a morte de um operário.',
            respostaCorreta_en:
                'The demonstration is interrupted by the police cavalry, causing panic, arrests (including Roberto s), and the death of a worker.',
            respostasErradas: [
                'O comício transcorre de forma pacífica, resultando em um acordo entre operários e patrões.',
                'Apenas os intelectuais são presos, enquanto os operários são protegidos pela polícia.',
                'O evento marca a vitória definitiva do movimento operário em Fortaleza, que consegue tomar o poder local.',
            ],
            respostasErradas_en: [
                'The rally proceeds peacefully, resulting in an agreement between workers and employers.',
                'Only the intellectuals are arrested, while the workers are protected by the police.',
                'The event marks the definitive victory of the labor movement in Fortaleza, which manages to seize local power.',
            ],
            explicacao:
                'A cavalaria dispersa a multidão e Roberto é preso, mostrando a repressão violenta à manifestação.',
            explicacao_en:
                'The cavalry disperses the crowd and Roberto is arrested, showing the violent repression of the demonstration.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'O que muitas vezes move os personagens para a revolução na visão apresentada pelo livro?',
            pergunta_en:
                'What often moves the characters toward revolution in the view presented by the book?',
            respostaCorreta:
                'Um impulso sentimental, o humano enternecimento e o desgosto, que a doutrina oficial às vezes despreza como "luxo de doido".',
            respostaCorreta_en:
                'A sentimental impulse, human tenderness, and sorrow, which official doctrine sometimes dismisses as a "madman s luxury."',
            respostasErradas: [
                'Apenas a fria lógica matemática e as equações econômicas iniludíveis.',
                'O desejo de ascensão social e riqueza pessoal através da política.',
                'O ódio puro e simples contra a cultura e os livros.',
            ],
            respostasErradas_en: [
                'Only cold mathematical logic and inescapable economic equations.',
                'The desire for social advancement and personal wealth through politics.',
                'Pure and simple hatred of culture and books.',
            ],
            explicacao:
                'Filipe admite que foi a ternura e o impulso sentimental, não a fria lógica, que o levaram a esses caminhos.',
            explicacao_en:
                'Filipe admits that it was tenderness and sentimental impulse, not cold logic, that led him down those paths.',
        },
        {
            idLivro: livro1.id.toString(),
            pergunta:
                'A fala de Filipe sobre estar nas "areias" e ter sido guindado a intelectual é fundamental porque:',
            pergunta_en:
                'Filipe s remark about being in the "sands" and having been elevated to an intellectual is fundamental because:',
            respostaCorreta:
                'Revela a autopercepção de Filipe como um intelectual que, apesar de sua origem pobre ("as areias"), encontra na militância um espaço de ascensão e reconhecimento.',
            respostaCorreta_en:
                'It reveals Filipe s self-perception as an intellectual who, despite his poor background ("the sands"), finds in militancy a space for advancement and recognition.',
            respostasErradas: [
                'Demonstra que todos os militantes tinham a mesma origem social e financeira, sem distinções entre eles.',
                'Indica que Roberto era o único capaz de entender a teoria marxista de forma pura por vir de uma classe mais abastada.',
                'Sugere que viver nas "areias" de Fortaleza era um privilégio buscado pelos intelectuais para fugir do barulho do Centro.',
            ],
            respostasErradas_en: [
                'It demonstrates that all militants had the same social and financial origin, with no distinctions among them.',
                'It indicates that Roberto was the only one capable of understanding Marxist theory in its purest form because he came from a more affluent class.',
                'It suggests that living in Fortaleza s "sands" was a privilege sought by intellectuals to escape the noise of downtown.',
            ],
            explicacao:
                'A frase mostra a ambivalência de classe de Filipe: pobre na origem, intelectual dentro do grupo operário.',
            explicacao_en:
                'The line shows Filipe s class ambivalence: poor by origin, intellectual within the workers group.',
        },
    ],
});
    console.log('✅ Seed concluído com sucesso!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
