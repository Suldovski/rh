import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Bell, Shield, Palette, Save } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações · Buca Geral RH" }] }),
  component: Configuracoes,
});

function Configuracoes() {
  const [company, setCompany] = useState({
    name: "Buca Geral Construtora Ltda.",
    cnpj: "12.345.678/0001-90",
    email: "rh@buca.com.br",
    phone: "(11) 4002-8922",
    address: "Av. Paulista, 1500 — Bela Vista, São Paulo/SP",
  });

  const [notif, setNotif] = useState({
    admissions: true,
    vacations: true,
    docExpiry: true,
    weeklyDigest: false,
  });

  return (
    <PageShell
      eyebrow="Sistema"
      title="Configurações"
      description="Preferências da conta, da empresa e do RH."
    >
      <Tabs defaultValue="empresa">
        <TabsList>
          <TabsTrigger value="empresa"><Building2 className="mr-1.5 h-3.5 w-3.5" /> Empresa</TabsTrigger>
          <TabsTrigger value="notificacoes"><Bell className="mr-1.5 h-3.5 w-3.5" /> Notificações</TabsTrigger>
          <TabsTrigger value="seguranca"><Shield className="mr-1.5 h-3.5 w-3.5" /> Segurança</TabsTrigger>
          <TabsTrigger value="aparencia"><Palette className="mr-1.5 h-3.5 w-3.5" /> Aparência</TabsTrigger>
        </TabsList>

        <TabsContent value="empresa" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Dados da empresa</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Field label="Razão social">
                <Input value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} />
              </Field>
              <Field label="CNPJ">
                <Input value={company.cnpj} onChange={(e) => setCompany({ ...company, cnpj: e.target.value })} />
              </Field>
              <Field label="E-mail do RH">
                <Input type="email" value={company.email} onChange={(e) => setCompany({ ...company, email: e.target.value })} />
              </Field>
              <Field label="Telefone">
                <Input value={company.phone} onChange={(e) => setCompany({ ...company, phone: e.target.value })} />
              </Field>
              <Field label="Endereço" className="md:col-span-2">
                <Input value={company.address} onChange={(e) => setCompany({ ...company, address: e.target.value })} />
              </Field>
              <div className="md:col-span-2 flex justify-end">
                <Button onClick={() => toast.success("Dados da empresa salvos.")}>
                  <Save className="mr-1 h-4 w-4" /> Salvar alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Alertas do RH</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <NotifRow
                label="Novas admissões"
                desc="Avisar quando um funcionário for cadastrado."
                checked={notif.admissions}
                onChange={(v) => setNotif({ ...notif, admissions: v })}
              />
              <Separator />
              <NotifRow
                label="Início de férias"
                desc="Lembretes 7 dias antes do início das férias."
                checked={notif.vacations}
                onChange={(v) => setNotif({ ...notif, vacations: v })}
              />
              <Separator />
              <NotifRow
                label="Documentos vencendo"
                desc="ASOs, exames periódicos e certificados próximos do vencimento."
                checked={notif.docExpiry}
                onChange={(v) => setNotif({ ...notif, docExpiry: v })}
              />
              <Separator />
              <NotifRow
                label="Resumo semanal"
                desc="Receber por e-mail um resumo das atividades de RH."
                checked={notif.weeklyDigest}
                onChange={(v) => setNotif({ ...notif, weeklyDigest: v })}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Segurança da conta</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Field label="Senha atual"><Input type="password" placeholder="••••••••" /></Field>
              <div />
              <Field label="Nova senha"><Input type="password" placeholder="Mínimo 8 caracteres" /></Field>
              <Field label="Confirmar nova senha"><Input type="password" /></Field>
              <div className="md:col-span-2 flex justify-end">
                <Button onClick={() => toast.success("Senha atualizada.")}>Atualizar senha</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aparencia" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Tema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <NotifRow
                label="Modo compacto"
                desc="Reduz o espaçamento das listagens e tabelas."
                checked={false}
                onChange={() => toast.message("Em breve.")}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function NotifRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="font-semibold text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
