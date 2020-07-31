export class MatrixHelper {
  public static listToMatrix(list: any[], elementsPerSubArray: number): any[][]{
    const matrix = [];
    let i;
    let k;
    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }
      matrix[k].push(list[i]);
    }
    return matrix;
  }
}
