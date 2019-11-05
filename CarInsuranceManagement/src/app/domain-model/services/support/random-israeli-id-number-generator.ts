export class RandomIsraeliIdentifierNumberGenerator {

  public generateIdentifier(): string {
    var iid = "", num, counter = 0;
    for (var i = 0; i < 8; i++) {
      num = this.getRandomInt((i < 2) ? 2 : 0, (i < 2) ? 3 : 9);
      iid += num.toString();
      counter += this.getInc(num, i);
    }
    return iid + (10 - (counter % 10)).toString();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getInc(num, i) {
    var inc = Number(num) * ((i % 2) + 1);
    return (inc > 9) ? inc -= 9 : inc;
  }


}
