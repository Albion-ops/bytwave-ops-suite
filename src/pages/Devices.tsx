import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Device {
  id: string;
  device_name: string;
  device_type: string;
  serial_number: string;
  manufacturer: string;
  model: string;
  status: string;
  location: string;
  notes: string;
  created_at: string;
}

const Devices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchDevices = async () => {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch devices',
        variant: 'destructive',
      });
    } else {
      setDevices(data || []);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleCreateDevice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const { error } = await supabase.from('devices').insert({
      device_name: formData.get('device_name') as string,
      device_type: formData.get('device_type') as string,
      serial_number: formData.get('serial_number') as string,
      manufacturer: formData.get('manufacturer') as string,
      model: formData.get('model') as string,
      status: formData.get('status') as string,
      location: formData.get('location') as string,
      notes: formData.get('notes') as string,
    });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Device added successfully',
      });
      setIsOpen(false);
      fetchDevices();
    }
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success';
      case 'in_use': return 'bg-primary';
      case 'maintenance': return 'bg-warning';
      case 'retired': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Devices</h1>
            <p className="text-muted-foreground">
              Manage your device inventory
            </p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Device
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Device</DialogTitle>
                <DialogDescription>
                  Enter device details to add to inventory
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateDevice} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="device_name">Device Name</Label>
                    <Input id="device_name" name="device_name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="device_type">Type</Label>
                    <Input id="device_type" name="device_type" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer">Manufacturer</Label>
                    <Input id="manufacturer" name="manufacturer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" name="model" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serial_number">Serial Number</Label>
                    <Input id="serial_number" name="serial_number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue="available">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="in_use">In Use</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" name="notes" />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Adding...' : 'Add Device'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {devices.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  No devices found. Add your first device to get started.
                </div>
              </CardContent>
            </Card>
          ) : (
            devices.map((device) => (
              <Card key={device.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{device.device_name}</CardTitle>
                    <Badge className={getStatusColor(device.status)}>
                      {device.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Type:</span> {device.device_type}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Manufacturer:</span> {device.manufacturer || 'N/A'}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Model:</span> {device.model || 'N/A'}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Serial:</span> {device.serial_number || 'N/A'}
                  </div>
                  {device.location && (
                    <div className="text-sm">
                      <span className="font-medium">Location:</span> {device.location}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Devices;
