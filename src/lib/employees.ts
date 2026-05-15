export type EmployeeStatus = "ativo" | "ferias" | "afastado" | "desligado";

export interface Employee {
  id: string;
  name: string;
  cpf: string;
  role: string;
  department: "Obra" | "Engenharia" | "Administrativo" | "Seguranca";
  site: string;
  admission: string;
  status: EmployeeStatus;
  phone: string;
  email: string;
  salary: number;
  rg: string;
  ctps: string;
  pis: string;
  address: string;
  certifications: string[];
}

export const employees: Employee[] = [
  {
    id: "1042",
    name: "José Carlos Almeida",
    cpf: "123.456.789-00",
    role: "Pedreiro",
    department: "Obra",
    site: "Residencial Vila Nova",
    admission: "2022-03-14",
    status: "ativo",
    phone: "(11) 98123-4501",
    email: "jose.almeida@buca.com.br",
    salary: 3200,
    rg: "33.456.789-1",
    ctps: "9876543/0012",
    pis: "120.45678.90-1",
    address: "Rua das Acácias, 220 — Itaquera, SP",
    certifications: ["NR-18", "NR-35"],
  },
  {
    id: "1043",
    name: "Marina Souza Lima",
    cpf: "234.567.890-11",
    role: "Engenheira Civil",
    department: "Engenharia",
    site: "Edifício Atlântico",
    admission: "2021-07-02",
    status: "ativo",
    phone: "(11) 99412-7820",
    email: "marina.lima@buca.com.br",
    salary: 14500,
    rg: "44.567.890-2",
    ctps: "1234567/0001",
    pis: "230.56789.01-2",
    address: "Av. Paulista, 1500 — Bela Vista, SP",
    certifications: ["CREA-SP", "PMP", "NR-35"],
  },
  {
    id: "1044",
    name: "Antônio Pereira da Silva",
    cpf: "345.678.901-22",
    role: "Mestre de Obras",
    department: "Obra",
    site: "Residencial Vila Nova",
    admission: "2018-01-10",
    status: "ativo",
    phone: "(11) 97765-4432",
    email: "antonio.silva@buca.com.br",
    salary: 6800,
    rg: "55.678.901-3",
    ctps: "2345678/0002",
    pis: "340.67890.12-3",
    address: "Rua dos Pinheiros, 88 — São Miguel, SP",
    certifications: ["NR-18", "NR-35", "NR-33"],
  },
  {
    id: "1045",
    name: "Carla Mendes Ribeiro",
    cpf: "456.789.012-33",
    role: "Analista de RH",
    department: "Administrativo",
    site: "Sede Administrativa",
    admission: "2023-05-22",
    status: "ferias",
    phone: "(11) 98876-1122",
    email: "carla.mendes@buca.com.br",
    salary: 5400,
    rg: "66.789.012-4",
    ctps: "3456789/0003",
    pis: "450.78901.23-4",
    address: "Rua Augusta, 940 — Consolação, SP",
    certifications: [],
  },
  {
    id: "1046",
    name: "Roberto Nunes Tavares",
    cpf: "567.890.123-44",
    role: "Técnico de Segurança",
    department: "Seguranca",
    site: "Edifício Atlântico",
    admission: "2020-11-03",
    status: "ativo",
    phone: "(11) 99001-5566",
    email: "roberto.nunes@buca.com.br",
    salary: 4900,
    rg: "77.890.123-5",
    ctps: "4567890/0004",
    pis: "560.89012.34-5",
    address: "Rua do Comércio, 12 — Tatuapé, SP",
    certifications: ["NR-18", "NR-35", "NR-33", "NR-06"],
  },
  {
    id: "1047",
    name: "Pedro Henrique Costa",
    cpf: "678.901.234-55",
    role: "Carpinteiro",
    department: "Obra",
    site: "Galpão Industrial Sul",
    admission: "2024-02-19",
    status: "ativo",
    phone: "(11) 98233-7788",
    email: "pedro.costa@buca.com.br",
    salary: 3100,
    rg: "88.901.234-6",
    ctps: "5678901/0005",
    pis: "670.90123.45-6",
    address: "Rua das Palmeiras, 345 — Guarulhos, SP",
    certifications: ["NR-18"],
  },
  {
    id: "1048",
    name: "Luciana Aparecida Rocha",
    cpf: "789.012.345-66",
    role: "Engenheira de Segurança",
    department: "Seguranca",
    site: "Sede Administrativa",
    admission: "2019-09-15",
    status: "afastado",
    phone: "(11) 97654-3322",
    email: "luciana.rocha@buca.com.br",
    salary: 11200,
    rg: "99.012.345-7",
    ctps: "6789012/0006",
    pis: "780.01234.56-7",
    address: "Av. Brigadeiro, 2200 — Jardins, SP",
    certifications: ["CREA-SP", "NR-35", "NR-18"],
  },
  {
    id: "1049",
    name: "Marcos Vinícius Oliveira",
    cpf: "890.123.456-77",
    role: "Eletricista",
    department: "Obra",
    site: "Edifício Atlântico",
    admission: "2023-08-01",
    status: "ativo",
    phone: "(11) 98345-9911",
    email: "marcos.oliveira@buca.com.br",
    salary: 3800,
    rg: "10.123.456-8",
    ctps: "7890123/0007",
    pis: "890.12345.67-8",
    address: "Rua dos Eletricistas, 77 — Mooca, SP",
    certifications: ["NR-10", "NR-35"],
  },
];

export function getEmployee(id: string) {
  return employees.find((e) => e.id === id);
}

export const sites = [
  "Residencial Vila Nova",
  "Edifício Atlântico",
  "Galpão Industrial Sul",
  "Sede Administrativa",
];
