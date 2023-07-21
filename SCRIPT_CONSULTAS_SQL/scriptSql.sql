create database userFunction;

use userFunction;

create table A1 (
A1_COD int not null,
A1_NOME varchar(50) not null,
A1_TIPO  varchar(50) not null,
primary key(A1_COD)
);

create table A3 (
A3_COD int not null,
A3_NOME varchar(50) not null,
A3_REGIAO  varchar(30) not null,
primary key(A3_COD)
);

insert into A1
(A1_COD, A1_NOME, A1_TIPO)
values
(1001, 'MARIA DA SILVA', 'Pessoa Física');

insert into A3
(A3_COD, A3_NOME, A3_REGIAO)
values
(114, 'OTTO ALBUQUERQUE', 'NORTE');

create table C5 (
C5_NUM int not null,
C5_EMISSAO date,
C5_CODCLI int,
C5_CODVEN int,
primary key(C5_NUM),
foreign key (C5_CODCLI) REFERENCES A1(A1_COD),
foreign key (C5_CODVEN) REFERENCES A3(A3_COD)
);

insert into C5
(C5_NUM, C5_EMISSAO, C5_CODCLI, C5_CODVEN)
values
(9004, '2023-03-03', 1004, 114);

create table C6 (
C6_NUM int not null,
C6_ITEM int,
C6_CODPROD int,
C6_QTD int,
C6_PRUNIT float
);

insert into C6
(C6_NUM, C6_ITEM, C6_CODPROD, C6_QTD, C6_PRUNIT)
values
(9003, '002', 7004, 210, 21.70);

/*=====================================================================================================================*/
/*======================================================================================================================*/

/*2.1) Consulta que retorne todos os pedidos do cliente “AFONSO COSTA”*/
select * from C5
inner join C6 on C5.C5_NUM=C6.C6_NUM
where C5_CODCLI = 1003;

/*2.2) Consulta que retorne todos os pedidos (com seus itens respectivos) emitidos no mês de janeiro de 2023*/
select * 
from C5
inner join C6 on C5.C5_NUM=C6.C6_NUM 
where MONTH(C5_EMISSAO) = 1;

/*2.3) Consulta que retorne o valor total dos pedidos em fevereiro de 2023*/
select C6_QTD * C6_PRUNIT AS ValorTotalDosPedidos FROM C6
inner join C5 on C6.C6_NUM=C5.C5_NUM 
where MONTH(C5.C5_EMISSAO) = 2;

select * 
from C5
inner join A3 on C5.C5_CODVEN=A3.A3_COD;

/*2.4) Consulta que retorne o valor total dos pedidos agrupados por nome de vendedor*/
select A3.A3_NOME AS NomeVendedor, C6_QTD * C6_PRUNIT AS ValorTotalDosPedidos  FROM C6
inner join C5 on C6.C6_NUM=C5.C5_NUM
inner join A3 on C5.C5_CODVEN=A3.A3_COD;

/*2.5) Consulta que retorne o valor total dos pedidos, vendidos em 2022 agrupados por tipo de cliente (pessoa física ou jurídica)*/
select A1.A1_TIPO AS TipoCliente, C6_QTD * C6_PRUNIT AS ValorTotalDosPedidos FROM C6
inner join C5 on C6.C6_NUM=C5.C5_NUM
inner join A1 on C5.C5_CODCLI=A1.A1_COD 
where YEAR(C5.C5_EMISSAO) = 2022;

/*2.6) Consulta que retorne o valor total dos pedidos, vendidos no primeiro semestre de 2023 agrupados por região do vendedor*/
select A3.A3_REGIAO AS RegiaoVendedor, C6_QTD * C6_PRUNIT AS ValorTotalDosPedidos  FROM C6
inner join C5 on C6.C6_NUM=C5.C5_NUM
inner join A3 on C5.C5_CODVEN=A3.A3_COD
where YEAR(C5.C5_EMISSAO) = 2023 AND MONTH(C5.C5_EMISSAO) < 7;
