function Exercise()
{
    this.d = $("#dia").val();
    this.m = $("#mes").val();
    this.a = $("#ano").val();

    this.date = this.d + "/" + this.m + "/" + this.a;
    this.exe = $("#exe").val();
    this.rep = $("#rep").val();
    this.ser = $("#ser").val();
}