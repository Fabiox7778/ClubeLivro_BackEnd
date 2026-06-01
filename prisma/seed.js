import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;
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
                curso: 'Análise e desenvolvimento de sistemas.',
                curso_en: 'Systems analysis and development.',
                funcao: 'Product Owner',
                descricao: 'Responsável pelo desenvolvimento do projeto e documentação.',
                descricao_en: 'Responsible for project development and documentation.',
                foto: 'https://exemplo.com/foto-ana.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Fabio Trevizolli',
                curso: 'Análise e desenvolvimento de sistemas.',
                curso_en: 'Systems analysis and development.',
                funcao: 'Scrum Master',
                descricao:
                    'Garante a organização do time seguindo princípios e práticas do framework scrum.',
                descricao_en:
                    'Ensures the team is organized by following the principles and practices of the Scrum framework.',
                foto: 'https://exemplo.com/foto-carlos.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Yasmin Oliveira',
                curso: 'Análise e desenvolvimento de sistemas.',
                curso_en: 'Systems analysis and development.',
                funcao: 'Developer',
                descricao: 'Responsável pelo desenvolvimento do sistema Back-end',
                descricao_en: 'Responsible for the development of back-end system.',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Murilo Brustolin',
                curso: 'Análise e desenvolvimento de sistemas.',
                curso_en: 'Systems analysis and development.',
                funcao: 'Developer Full Stack',
                descricao:
                    'Responsável pelo desenvolvimento do Back-end and organização do banco de dados.',
                descricao_en: 'Responsible for back-end development and database organization.',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Rebeca Alves',
                curso: 'Análise e desenvolvimento de sistemas.',
                curso_en: 'Systems analysis and development.',
                funcao: 'Developer',
                descricao: 'Responsável pelo desenvolvimento do Front-end e prototipação do Figma.',
                descricao_en: 'Responsible for front-end development and prototyping in Figma.',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Luiz Felipe',
                curso: 'Análise e desenvolvimento de sistemas.',
                curso_en: 'Systems analysis and development.',
                funcao: 'Developer',
                descricao:
                    'Responsável pela prototipação do Figma e organização do progresso do projeto no Trello.',
                descricao_en:
                    'Responsible for Figma prototyping and organizing project progress in Trello.',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Helena Rossi',
                curso: 'Eletro-eletrônica.',
                curso_en: 'Electrical and electronic engineering.',
                funcao: 'Leitor e Analista',
                descricao:
                    'Responsável pela leitura do livro e por repassar seus conhecimentos e informações necessárias.',
                descricao_en:
                    'Responsible for reading the book and passing on the necessary knowledge and information.',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: "Leonardo Sant'anna",
                curso: 'Mecânica.',
                curso_en: 'Mechanics.',
                funcao: 'Leitor e Analista',
                descricao:
                    'Responsável pela leitura do livro e por repassar seus conhecimentos e informações necessárias.',
                descricao_en:
                    'Responsible for reading the book and passing on the necessary knowledge and information.',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Arthur Napolli',
                curso: 'Eletro-eletrônica.',
                curso_en: 'Electrical and electronic engineering.',
                funcao: 'Leitor e Analista',
                descricao:
                    'Responsável pela leitura do livro e por repassar seus conhecimentos e informações necessárias.',
                descricao_en:
                    'Responsible for reading the book and passing on the necessary knowledge and information..',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
            {
                nome_equipe: 'Equipe DevStone',
                nome: 'Matheus Lima',
                curso: 'Mecânica.',
                curso_en: 'Mechanics.',
                funcao: 'Leitor e Analista',
                descricao:
                    'Responsável pela leitura do livro e por repassar seus conhecimentos e informações necessárias.',
                descricao_en:
                    'Responsible for reading the book and passing on the necessary knowledge and information..',
                foto: 'https://exemplo.com/foto-maria.jpg',
            },
        ],
    });

    console.log('👥 Inserindo Usuários...');

    await prisma.usuario.createMany({
        data: [
            {
                nome: 'João da Silva',
                idade: 25,
                email: 'joao@exemplo.com',
                username: 'joaosilva',
                senha: 'senha_segura_hash_aqui',
                descricao: 'Estudante ávido por literatura brasileira.',
                descricao_en: 'Avid Brazilian literature student.',
            },
            {
                nome: 'Maria Oliveira',
                idade: 22,
                email: 'maria@exemplo.com',
                username: 'mariaoliveira',
                senha: 'senha_segura_hash_aqui',
                descricao: 'Professora de literatura clássica.',
                descricao_en: 'Classical literature teacher.',
            },
            {
                nome: 'Pedro Costa',
                idade: 28,
                email: 'pedro@exemplo.com',
                username: 'pedrocosta',
                senha: 'senha_segura_hash_aqui',
                descricao: 'Apaixonado por romances modernistas.',
                descricao_en: 'Passionate about modernist novels.',
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

    console.log('📚 Inserindo Livro 1: O Caminho das Pedras...');

    const livro1 = await prisma.livro.create({
        data: {
            titulo: 'O Caminho das Pedras',
            capa: 'https://exemplo.com/capa-caminho-das-pedras.jpg',
            autor: 'Rachel de Queiroz',
            detalhesAutor:
                'Rachel de Queiroz (1910-2003) foi uma grande escritora, jornalista, tradutora e dramaturga brasileira. Ganhou diversos prêmios, dentre eles o "Prêmio Camões" aos 81 anos, sendo portanto, a primeira mulher a recebê-lo. Além disso, foi a primeira mulher a ocupar uma cadeira na Academia Brasileira de Letras, em 1977. Foi militante política e afiliada ao Partido Comunista Brasileiro. Foi casada duas vezes, seu primeiro marido foi o poeta José Auto da Cruz Oliveira, e após a separação casou-se com o médico Oyama de Macedo.',
            detalhesAutor_en:
                'Rachel de Queiroz (1910-2003) was a great Brazilian writer, journalist, translator, and playwright. She won numerous awards, including the Camões Prize at the age of 81, becoming the first woman to receive it. Furthermore, she was the first woman to hold a seat in the Brazilian Academy of Letters, in 1977. She was a political activist and affiliated with the Brazilian Communist Party. She was married twice; her first husband was the poet José Auto da Cruz Oliveira, and after their separation, she married the physician Oyama de Macedo.',
            anoPublicacao: 1936,
            genero: 'Ficção Política',
            genero_en: 'Political Fiction',
            resumo: 'Caminho das Pedras narra a história de Noemi, uma mulher casada com João Jaques, mas que vive um relacionamento sem felicidade e marcado pela rotina. Sua vida começa a mudar quando ela conhece Roberto, um jornalista e militante político envolvido com movimentos socialistas e lutas trabalhistas. Com o passar do tempo, Noemi se aproxima de Roberto e acaba se apaixonando por ele. Esse relacionamento faz com que ela enfrente conflitos emocionais e morais, além do julgamento da sociedade conservadora da época, que condenava mulheres que desrespeitavam os padrões tradicionais do casamento. Enquanto desenvolve o drama amoroso da protagonista, o livro também retrata a realidade social e política do Brasil nos anos 1930, durante a Era Vargas. A narrativa mostra perseguições políticas, desigualdade social, pobreza e dificuldades enfrentadas pelos trabalhadores nordestinos. Rachel de Queiroz utiliza uma linguagem simples e realista para abordar temas como liberdade feminina, injustiça social, política e os desafios de quem tenta buscar independência em uma sociedade cheia de preconceitos e limitações.',
            resumo_en:
                'Caminho das Pedras tells the story of Noemi, a married woman who lives in an unhappy and routine relationship with her husband, João Jaques. Her life begins to change when she meets Roberto, a journalist and political activist involved with socialist movements and workers’ struggles. As time passes, Noemi grows closer to Roberto and eventually falls in love with him. This relationship causes emotional and moral conflicts, as well as judgment from the conservative society of the time, which condemned women who broke traditional marriage standards. While developing the protagonist’s love drama, the novel also portrays the social and political reality of Brazil in the 1930s, during the Vargas Era. The narrative shows political persecution, social inequality, poverty, and the difficulties faced by Northeastern workers. Rachel de Queiroz uses a simple and realistic language to address themes such as female freedom, social injustice, politics, and the challenges of seeking independence in a society full of prejudice and limitations.',
            contexto:
                'Forte influência do período pós-Revolução de 1930, retratando a polarização Caminho das Pedras foi publicado em 1937, durante o governo de Getúlio Vargas, em um período marcado por grandes mudanças políticas, sociais e econômicas no Brasil. A década de 1930 foi caracterizada pelo fortalecimento do poder do governo, pela censura e pela perseguição a grupos políticos considerados perigosos, principalmente socialistas e comunistas. Nesse período, o Brasil enfrentava problemas como pobreza, desigualdade social e dificuldades econômicas, especialmente no Nordeste. Os trabalhadores viviam em condições difíceis e muitos movimentos operários surgiam para lutar por melhores condições de vida e trabalho. Essas tensões aparecem no livro por meio dos personagens ligados à política e às causas sociais. Além disso, a sociedade da época era bastante conservadora, principalmente em relação ao papel da mulher. As mulheres tinham pouca liberdade e eram pressionadas a seguir padrões tradicionais de casamento e comportamento. Por isso, a personagem Noemi representa o conflito entre os desejos pessoais e as regras impostas pela sociedade. O contexto histórico da obra ajuda a explicar os temas principais do romance, como repressão política, desigualdade social, liberdade feminina e crítica à sociedade brasileira dos anos 1930.política no Brasil e a organização da classe trabalhadora.',
            contexto_en:
                'Caminho das Pedras was published in 1937, during the government of Getúlio Vargas, in a period marked by major political, social, and economic changes in Brazil. The 1930s were characterized by the strengthening of government power, censorship, and the persecution of political groups considered dangerous, especially socialists and communists. During this period, Brazil faced problems such as poverty, social inequality, and economic difficulties, especially in the Northeast region. Workers lived under harsh conditions, and many labor movements emerged to fight for better living and working conditions. These tensions appear in the novel through characters connected to politics and social causes. In addition, society at that time was very conservative, especially regarding the role of women. Women had little freedom and were pressured to follow traditional standards of marriage and behavior. Because of this, the character Noemi represents the conflict between personal desires and the rules imposed by society. The historical context of the novel helps explain its main themes, such as political repression, social inequality, female freedom, and criticism of Brazilian society in the 1930s.',
            estiloEscrita:
                'O estilo de escrita de Rachel de Queiroz em Caminho das Pedras integra-se à vertente do verismo realista, alimentando-se de realidades concretas, nítidas e frequentemente cruas. Essa economia de palavras resulta em uma inesquecível força dramática, onde o cenário de Fortaleza na década de 1930 é construído através de sensações táteis e olfativas, como o sol que queima nas calçadas o cheiro de adega e comida abafada das pensões e o mormaço que vence os personagens como uma dormideira. Sua prosa é descrita como limpa e precisa, o que confere à narrativa uma inesquecível força dramática. Rachel combina a observação profunda da psicologia dos personagens com uma perspectiva social marcante, focando em dramas humanos e questões coletivas. Ela é considerada uma narradora nata, cuja escrita na ficção e na crônica gira em torno de figuras humanas, problemas do cotidiano e dramas sociais, seja no sertão nordestino ou no ambiente urbano.',
            estiloEscrita_en:
                'The writing style of Rachel de Queiroz in Caminho das Pedras is connected to the tradition of realist verismo, drawing from concrete, vivid, and often harsh realities. This economy of words creates an unforgettable dramatic strength, where the setting of Fortaleza in the 1930s is built through tactile and olfactory sensations, such as the sun that “burns on the sidewalks,” the “smell of wine cellars and stale food” in boarding houses, and the oppressive heat that overwhelms the characters like a “sleep-inducing numbness.” Her prose is described as clean and precise, which gives the narrative a remarkable dramatic intensity. Rachel combines deep psychological observation of her characters with a strong social perspective, focusing on human struggles and collective issues. She is considered a natural storyteller whose fiction and chronicles revolve around human figures, everyday problems, and social dramas, whether in the northeastern Brazilian countryside or in urban environments.',
            enredo: 'Caminho das Pedras acompanha a vida de Noemi, uma mulher casada que vive um relacionamento infeliz e monótono com seu marido, João Jaques. Sua vida muda quando ela conhece Roberto, um jornalista e militante político envolvido com movimentos socialistas e lutas trabalhistas. Com o tempo, Noemi e Roberto se aproximam e acabam se apaixonando. O relacionamento dos dois provoca conflitos emocionais e sociais, pois a sociedade conservadora da época condenava mulheres que rompiam os padrões tradicionais do casamento. Enquanto conta a história amorosa de Noemi, o romance também retrata a realidade política e social do Brasil nos anos 1930, mostrando pobreza,  desigualdade social, perseguições políticas e as dificuldades enfrentadas pelos trabalhadores nordestinos. Ao longo da narrativa, Noemi enfrenta dúvidas, sofrimento e julgamentos sociais enquanto tenta encontrar liberdade e felicidade. Rachel de Queiroz mistura romance e crítica social para mostrar os conflitos e desafios da sociedade brasileira daquele período. Acompanha a trajetória de Roberto, um jovem idealista que se envolve com o movimento comunista, e a tensão entre as novas ideologias e as velhas estruturas de poder.',
            enredo_en:
                'Caminho das Pedras follows the life of Noemi, a married woman who lives in an unhappy and monotonous relationship with her husband, João Jaques. Her life changes when she meets Roberto, a journalist and political activist involved with socialist movements and workers’ struggles. As time passes, Noemi and Roberto grow closer and eventually fall in love. Their relationship creates emotional and social conflicts, since the conservative society of the time condemned women who broke traditional marriage standards. While telling Noemi’s love story, the novel also portrays the political and social reality of Brazil in the 1930s, showing poverty, social inequality, political persecution, and the difficulties faced by workers in the Northeast region. Throughout the narrative, Noemi faces doubts, suffering, and social judgment while trying to find freedom and happiness. Rachel de Queiroz combines romance and social criticism to portray the conflicts and challenges of Brazilian society during that period.Follows the trajectory of Roberto, a young idealist who gets involved with the communist movement, and the tension between new ideologies and old power structures.',
            verossimilhanca:
                'Mostrado nas reuniões das personagens para planejar e recrutar membros para o partido comunista, reforçando sempre a revolução. “O operário é que deve guiar o operário, e não elemento estranho a classe!” Evidenciado com a prisão de Roberto e alguns outros camaradas pelos soldados. “Em torno dele a multidão se debatia em fuga, empurrava-se era toda um só grito e um só pavor. E os soldados iam navegando por entre a massa, cavando caminho a espaldeiradas, como remadores desesperados sobre um mar de tempestade”. Exibido pela constante tentativa de comando de João Jaques tratando-se da conduta de sua esposa. “As mulheres daqui ainda não estão maduras para a luta... Confundem questão social com questão sexual”. Trabalhadores de baixa renda retratados sempre fadigados de uma rotina monótona de suas tarefas do trabalho, e a difícil busca de ocupação durante o desemprego. “Ficou a palavra: “auxílio”. É verdade, ia precisar de auxílio. Ia ter que viver à custa de Roberto, até arranjar outro emprego.”',
            verossimilhanca_en:
                'Shown through the characters’ meetings to plan and recruit members for the CommunistParty, constantly reinforcing the idea of revolution.“The worker himself must guide the worker, and not someone outside the class!” Highlighted by the arrest of Roberto and some other comrades by soldiers. “Around him the crowd struggled in flight, pushing against itself, all reduced to a single cry and a single terror. And the soldiers moved through the mass, forcing their way with blows from their rifles, like desperate rowers upon a stormy sea.” Displayed through João Jaques’s constant attempts to control his wife’s behavior. “The women here are still not ready for the struggle… They confuse social issues with sexual issues.” Low-income workers are portrayed as constantly exhausted by the monotonous routine of their jobs and by the difficult search for work during unemployment. “One word remained: ‘assistance.’ It was true, she would need assistance. She would have to live at Roberto’s expense until she could find another job.”',
            caracteristicasLiterarias:
                'A escrita da Rachel é super direta. Ela não fica enrolando com descrições gigantescas ou choradeira barata. Quando uma coisa triste acontece — como a morte do filho da Noemi —, ela te dá um soco no estômago com frases curtas e realistas. O tom é quase o de um jornalista contando os fatos. Os personagens não são robôs guiados pelo destino. Eles erram, têm dúvidas e tomam decisões sabendo que vão se ferrar. A Noemi sabe o tamanho do escândalo que vai causar ao largar o marido, mas escolhe ir mesmo assim. Todo mundo ali tem uma bagagem psicológica bem humana. Essa é a jogada mais genial do livro. A Rachel usa duas roupas para explicar o racha no movimento: Os Gravatas: A galera intelectual, de classe média, que adora ficar discutindo teoria política no sofá, mas que na hora do vamos ver, é cheia de vaidade e preconceito. Os Tamancos: O operário da fábrica, que mal tem o que comer e que quer a revolução porque a vida dele está um inferno hoje, não porque leu Karl Marx. Sabe aquele filme onde o herói ganha no final, a polícia é derrotada e todo mundo comemora? Esquece. O livro é o oposto disso. O movimento falha porque a galera bate cabeça, o líder é preso e a revolução dá errado. O "heroísmo" no livro não é salvar o mundo, é a Noemi conseguir levantar da cama no dia seguinte para continuar vivendo.  A Rachel faz uma crítica pesada a como a sociedade dos anos 30 tratava as mulheres. A Noemi não sofre só porque a polícia persegue o namorado dela; ela sofre porque o mundo julga cada passo que ela dá como mulher. E o mais louco: mesmo os caras "revolucionários" e moderninhos da história dão suas escorregadas machistas.',
            caracteristicasLiterarias_en:
                'Rachel´s writing is incredibly direct. She doesn´t beat around the bush with lengthy descriptions or cheap whining. When something sad happens—like the death of Noemi´s son—she punches you in the gut with short, realistic sentences. The tone is almost like a journalist reporting the facts. The characters aren´t robots guided by fate. They make mistakes, have doubts, and make decisions knowing they´ll get screwed. Noemi knows the magnitude of the scandal she´ll cause by leaving her husband, but she chooses to go anyway. Everyone there has a very human psychological baggage. That´s the book´s most brilliant move. Rachel uses two outfits to explain the split in the movement: The Ties: The intellectual, middle-class crowd who love to discuss political theory on the couch, but who, when push comes to shove, are full of vanity and prejudice. The Clogs: The factory worker, who barely has enough to eat and wants revolution because his life is hell today, not because he read Karl Marx. You know those movies where the hero wins in the end, the police are defeated, and everyone celebrates? Forget it. The book is the opposite of that. The movement fails because people clash, the leader is arrested, and the revolution goes wrong. The "heroism" in the book isn´t about saving the world, it´s about Noemi managing to get out of bed the next day to keep living. Rachel makes a harsh critique of how 1930s society treated women. Noemi doesn´t just suffer because the police are chasing her boyfriend; she suffers because the world judges every step she takes as a woman. And the craziest thing: even the "revolutionary" and modern guys in the story have their sexist slips.',
            conclusao:
                'Em nossa leitura do livro "Caminhos das Pedras" , interpretamos a obra não apenas como um registro da militância clandestina na Fortaleza de 1930, mas como um profundo testemunho da resiliência humana frente à derrota. O livro revela o conflito entre a fria teoria ideológica e a crueza da realidade, onde a desconfiança entre intelectuais e operários os gravata  e os tamanco  que expõe como as convicções políticas muitas vezes esbarram no sentimentalismo humano. A jornada de Noemi personifica o verdadeiro caminho de pedra : ela atravessa o estigma do adultério, a perda trágica do filho Guri e a dispersão de seus companheiros sob a repressão do Estado. Para o nosso grupo, o desfecho da obra não foca na vitória de uma causa, mas na resistência biológica e afetiva. Ao subir a ladeira do Gasômetro sozinha e grávida, Noemi transforma sua dor em uma caminhada persistente, ela ampara o ventre e chama o futuro filho de companheiro , simbolizando que, mesmo quando as instituições e os homens falham, a vida insiste em avançar sobre as asperezas do caminho.',
            conclusao_en:
                'In our reading of the book "Caminhos das Pedras" (Paths of Stones), we interpret the work not only as a record of clandestine activism in Fortaleza in 1930, but as a profound testament to human resilience in the face of defeat. The book reveals the conflict between cold ideological theory and the harshness of reality, where the distrust between intellectuals and workers—the "tie-wearing" and the "clog-wearing"—exposes how political convictions often clash with human sentimentality. Noemi´s journey embodies the true path of stone: she traverses the stigma of adultery, the tragic loss of her son Guri, and the dispersal of her companions under state repression. For our group, the ending of the work does not focus on the victory of a cause, but on biological and emotional resistance. As she climbed the Gasometer hill alone and pregnant, Noemi transformed her pain into a persistent walk; she supported her belly and called her future child her companion, symbolizing that, even when institutions and men fail, life insists on moving forward despite the hardships of the path.',
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
                dicaTitulo: 'O Romance de 30 e a Política',
                dicaTitulo_en: 'The 1930s Novel and Politics',
                tipo: 'Artigo',
                tipo_en: 'Article',
                descricaoDica:
                    'Entenda como José Lins do Rego introduziu o debate sobre o comunismo e o operariado no Nordeste.',
                descricaoDica_en:
                    'Understand how José Lins do Rego introduced the debate about communism and the working class in the Northeast.',
                curtidasDica: 15,
                material: 'https://exemplo.com/artigo-caminho-pedras.pdf',
            },
            {
                idDoLivro: livro1.id,
                dicaTitulo: 'Análise dos Personagens',
                dicaTitulo_en: 'Character Analysis',
                tipo: 'Vídeo',
                tipo_en: 'Video',
                descricaoDica:
                    'Vídeo explicativo sobre os principais personagens e seus conflitos psicológicos.',
                descricaoDica_en:
                    'Explanatory video about the main characters and their psychological conflicts.',
                curtidasDica: 8,
                material: 'https://exemplo.com/video-personagens.mp4',
            },
        ],
    });

    await prisma.simulados.createMany({
        data: [
            {
                // 🌟 Adaptado: convertendo o id numérico para string usando template string
                idLivro: `${livro1.id}`,
                pergunta:
                    'Diferente dos primeiros livros do "Ciclo da Cana-de-Açúcar", qual é o foco principal de "O Caminho das Pedras"?',
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
                    'Em "O Caminho das Pedras", José Lins do Rego abandona temporariamente os engenhos para retratar a cidade, focando nas greves e no engajamento político e operário (comunismo) da década de 1930.',
                explicacao_en:
                    'In "The Path of Stones", José Lins do Rego temporarily abandons the sugar mills to depict the city, focusing on strikes and the political and working-class engagement (communism) of the 1930s.',
            },
            {
                // 🌟 Adaptado: convertendo o id numérico para string usando template string
                idLivro: `${livro1.id}`,
                pergunta:
                    'Qual é a principal característica do estilo de escrita de José Lins do Rego em "O Caminho das Pedras"?',
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
    });
